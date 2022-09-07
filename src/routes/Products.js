const e = require('express');
const { Router } = require('express');
const mercadopago = require('mercadopago');
require('dotenv').config();

mercadopago.configure({
	access_token:
		'APP_USR-7262929329049314-083112-618a2487d51780282e7c007859e9dc37-408019538'
});

module.exports = {
	mercadopago
};
const {
	filterByGenre,
	filterByCategory,
	getAllProducts,
	filterBySize,
	filterByBrand,
	filterByName
	//PayToProduct
} = require('../Controllers');
const { Product, Category, User, Review } = require('../db.js');

const router = Router();

router.get('/', async (req, res, next) => {
	const { name, genre, category, size, brand } = req.query;
	try {
		const allProducts = await getAllProducts();

		if (name || genre || category || size || brand) {
			var info;
			if (name) {
				info = await filterByName(name);
			}
			if (genre) {
				info = await filterByGenre(genre);
			}
			if (category) {
				info = await filterByCategory(category);
			}
			if (size) {
				info = await filterBySize(size);
			}
			if (brand) {
				info = await filterByBrand(brand);
			}

			return res.status(200).send(info);
		} else {
			return res.json(allProducts);
		}
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			const productDetail = await Product.findByPk(id, { include: Review });
			if (productDetail) {
				let sum = 0;
				let total = 0;
				let aux = [];
				let categoryDb = await Category.findByPk(productDetail.categoryId);
				let userComments = await User.findAll({
					attributes: ['email', 'username'],
					include: {
						model: Review,
						where: { productId: id },
						required: true
					}
				});
				if (userComments?.length) {
					userComments.forEach((e) => {
						sum += e.reviews[0].data[0].number;
						aux.push({
						    id: e.id,
							email: e.email,
							username: e.username,
							number: e.reviews[0].data[0].number,
							comment: e.reviews[0].data[0].comment
						});
					});
					total = (sum + productDetail.score) / (userComments.length + 1);
				} else {
					total = productDetail.score;
				}

				const concatProduct = {
					...productDetail.dataValues,
					categoryName: categoryDb.name,
					opinion: aux,
					average: parseFloat(total.toFixed(1))
				};
				res.status(200).json(concatProduct);
			} else {
				return res.status(200).json({ message: 'ID not found' });
			}
		}
	} catch (e) {
		next(e);
	}
});

router.delete('/delete/:id', async function (req, res, next) {
	const { id } = req.params;
	try {
		if (id) {
			await Product.destroy({
				where: { id: id }
			});
			res.send({ msg: 'producto eliminado' });
		}
	} catch (e) {
		next(e);
	}
});

router.post('/', async (req, res, next) => {
	try {
		let {
			name,
			brand,
			price,
			stock,
			image,
			size,
			genre,
			offer,
			discount,
			category
		} = req.body;
		if (name && brand && price && stock && image && size && genre && category) {
			let catId = await Category.findOne({ where: { name: category } });
			await Product.create({
				name: name,
				brand: brand,
				price: parseFloat(price),
				stock: parseInt(stock),
				image: image,
				size: size,
				genre: genre,
				offer: offer,
				discount: discount,
				categoryId: catId.id
			});
			res.status(200).json({ message: 'New Product Created!' });
		} else {
			res.status(400).json({ message: 'Invalid data error!!' });
		}
	} catch (e) {
		next(e);
	}
});

router.put('/change/:id', async (req, res, next) => {
	try {
		let { id } = req.params;
		const { price, stock, image, sold, size, score, genre, offer, discount } =
			req.body;
		let product = await Product.findByPk(id);
		await product.update({
			...product,
			price: parseFloat(price),
			stock: parseInt(stock),
			image: image,
			sold: parseInt(sold),
			size: size,
			score: parseFloat(score),
			genre: genre,
			offer: offer,
			discount: discount ? discount : false
		});
		res.status(200).json({ message: 'Successfully modified product!' });
	} catch (e) {
		next(e);
	}
});
router.post("/comprar/", async (req,res) => {
		const productsToBuy = req.body;
     
let preference = {
			items: [],
			//    payer: {
			//    	name: datos.name,
			//        surname: datos.surname,
			//        email: datos.email
			//      },
			   back_urls: {
				   "success": "http://localhost:3000/Checkout",
				   "failure": "http://localhost:3000/Checkout",
				   "pending": "http://localhost:3000/Checkout"
			   },
			   auto_return: "approved",
		   } 
		   productsToBuy.map(async(e) => {
			if (e[2].id) {
			 let product = await Product.findByPk(e[2].id)
			  await product.update({
				 ...product,
				 stock: product.stock--,
				 sold: product.sold++,
			 })
			}
		  });
		productsToBuy.map((e) => {
			if (e[1].id) {
			  e[1].stock--;
			  preference.items.push({
				title: e[1].name,
				unit_price: e[1].price,
				quantity: 1,
			  });
			}
		  });

	   const response = await mercadopago.preferences.create(preference);
       const preferenceId = response.body.id
	   res.send(preferenceId)
 })

router.post("/comprar/:id", async (req,res) => {
	const id = req.params.id
	if(id){
	const producto = await Product.findByPk(id)
		let preference = {
		 items: [
			 {
				picture_url: producto.image,
				title: producto.name,
				unit_price: producto.price,
			    quantity: 1,
			 }
		    ],
			// payer: {
			// 	name: datos.name,
            //     surname: datos.surname,
            //     email: datos.email
			//   },
			back_urls: {
				"success": "http://localhost:3000/Checkout",
				"failure": "http://localhost:3000/Checkout",
				"pending": "http://localhost:3000/Checkout"
			},
			auto_return: "approved",
		} 
	const response = await mercadopago.preferences.create(preference);
	const preferenceId = response.body.id
	res.send(preferenceId)
	}
 })
module.exports = router;
