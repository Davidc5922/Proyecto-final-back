const { Router } = require('express');
const { findByName } = require('../Controllers/User_C.js');
const router = Router();
const { User, Product, Review } = require('../db');

//USUARIOS

router.get('/', async (req, res, next) => {
	try {
		const { email } = req.query;
		let allUsers = await User.findAll();
		if (email) {
			let filterEmail = allUsers.filter((e) =>
				e.email.toLowerCase().includes(email.toString().toLowerCase())
			);
			return res.send(filterEmail);
		} else {
			return res.send(allUsers);
		}
	} catch (e) {
		next(e);
	}
});

router.get('/:email', async (req, res, next) => {
	try {
		const { email } = req.params;
		const user = await User.findOne({
			where: { email: email }
		});
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(200).json({ message: 'EMAIL not found' });
		}
	} catch (e) {
		next(e);
	}
});

router.post('/post', async (req, res, next) => {
	let { nickname, email, picture } = req.body;

	try {
		const user = await User.findOne({ where: { email: email } }); //si ya existe el nombre de usuario debo poner otro
		console.log(typeof user);
		if (user) {
			console.log(user);
			return res.status(200).send(user);
		} else {
			let newUser = await User.create({
				username: nickname ? nickname : 'no tiene nickname',
				email: email ? email : 'no tiene email',
				img: picture ? picture : 'no tiene imagen'
			});
			res.status(200).json(newUser);
		}
	} catch (e) {
		next(e);
	}
});

router.put('/update/:id', async (req, res, next) => {
	try {
		const {
			username,
			name,
			surname,
			img,
			age,
			province,
			location,
			postal,
			telephone,
			extra
		} = req.body;
		const { id } = req.params;
		let user = await User.findByPk(id);
		await user.update({
			...user,
			username: username ? username : user.username,
			name: name ? name : user.name,
			surname: surname ? surname : user.surname,
			img: img ? img : user.img,
			age: age ? age : user.age,
			province: province ? province : user.province,
			location: location ? location : user.location,
			postal: postal ? parseInt(postal) : user.postal,
			telephone: telephone ? parseInt(telephone) : user.telephone,
			extra: extra ? extra : user.extra
		});
		res.send(user);
	} catch (e) {
		next(e);
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
router.get('/favorite/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByPk(id);
		res.send(user.favorite.map((e) => JSON.parse(e)));
	} catch (e) {
		console.log(e);
	}
});

router.put('/favorite/', async (req, res) => {
	try {
		const { idP, idU } = req.body;
		const product = await Product.findByPk(idP);
		const user = await User.findByPk(idU);
		let productObject = {
			id: product.id,
			name: product.name,
			image: product.image,
			price: product.price
		};

		let filterProducts = user.favorite.filter((e) => JSON.parse(e).id === idP);
		//compruebo si el producto que queremos agregar, ya está en la seccion de fav

		if (!filterProducts.length) {
			await user.update({
				...user,
				favorite: [...user.favorite, productObject]
			});
			return res.send(user);
		} else {
			res.send('el producto ya está en favoritos');
		}
	} catch (e) {
		console.log(e);
	}
});

router.delete('/favorite', async (req, res) => {
	try {
		const { idP, idU } = req.body;
		const user = await User.findByPk(idU);
		const filterProducts = user.favorite.filter(
			(e) => JSON.parse(e).id !== idP
		);
		const usermod = await user.update({
			...user,
			favorite: filterProducts
		});
		res.send(usermod);
	} catch (e) {
		console.log(e);
	}
});

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
