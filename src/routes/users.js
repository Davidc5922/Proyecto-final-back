const { Router } = require('express');
const { findByName } = require('../Controllers/User_C.js');
const router = Router();
const { User, Product} = require('../db');



//USUARIOS
router.post('/post', async (req, res) => {
	let { name, surname, username, email, age, location } = req.body;
	try {
		const user = await findByName(username); //si ya existe el nombre de usuario debo poner otro
		if (user.length) {
			return res
				.status(300)
				.send('el nombre de usuario ya existe, porfavor intenta con otro');
		} else {
			await User.create({
				name,
				surname,
				username,
				email,
				age,
				location
			});
			res.status(200).send('User created!!');
		}
	} catch (e) {
		res.send(e);
	}
});

router.put('/ban/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		let user = await User.findByPk(id);
		await user.update({
			...user,
			ban: user.ban === false ? true : false
		});
		res.send(user);
	} catch (e) {
		next(e);
	}
});

//FAVORITOS
router.get('/favorite/:id', async (req,res) => {
try {
	const {id} = req.params
	 const user = await User.findByPk(id);
	 res.send(user.favorite.map(e => JSON.parse(e))) 
} catch (e) {
	console.log(e)
}
})



router.put('/favorite/', async (req,res) => {
	try {
		const {idP,idU} = req.body;
		const product = await Product.findByPk(idP);
		const user = await User.findByPk(idU);
		let productObject = {
			id: product.id,
			name: product.name,
			image: product.image,
			price: product.price
		}
        
	    let filterProducts = user.favorite.filter(e => JSON.parse(e).id === idP);
		//compruebo si el producto que queremos agregar, ya está en la seccion de fav
         
		if(!filterProducts.length){
           await user.update({
			...user,
			favorite: [...user.favorite, productObject],
		   })
          return res.send(user)
		}else{
         res.send("el producto ya está en favoritos")
		}
	} catch (e) {
		console.log(e)
	}
})

router.delete('/favorite', async (req,res) => {
	try {
		const {idP,idU} = req.body;
		const user = await User.findByPk(idU);
		const filterProducts = user.favorite.filter(e => JSON.parse(e).id !== idP)
        const usermod = 	await user.update({
			...user,
			favorite: filterProducts,
		})
       res.send(usermod)

	} catch (e) {
		console.log(e);
	}
})



module.exports = router;
/* 
{
    "name": "Alexander",
    "surname": "Cañete",
    "username": "chaque1111",
    "email": "alexandercaete@gmail.com",
    "age": "18",
    "location": "capitan solari, chaco Argentina"
} 
*/