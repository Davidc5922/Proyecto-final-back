const { Router } = require('express');
const { Product, Category } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		return res.send('Funciona');
	} catch (error) {}
});

router.get('/:Id', async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		if (id) {
			let product = await Product.findByPk(id);
			let product_ID = product.map((e) => {
				return {
					name: e.name,
					brand: e.brand,
					price: e.price,
					stock: e.stock,
					image: e.image,
					sold: e.sold,
					size: e.size,
					score: e.score,
					genre: e.genre
				};
			});
			res.status(200).json(product_ID);
		}
	} catch (error) {}
});
router.delete('/:id', async function (req, res) {
	const { id } = req.params;
	try {
		if (id) {
			await Product.destroy({
				where: { id: id }
			});
			res.send({ msg: 'producto eliminado' });
		}
	} catch (error) {
		console.log(error);
	}
});

router.post('*', async (req, res, next) => {
	let { name, brand, price, stock, image, sold, size, score, genre } = req.body;

	try {
		let newProduct = await Product.create({
			name,
			brand,
			price,
			stock,
			image,
			sold,
			size,
			score,
			genre
		});

		res.status(200).send('Producto Creado');
	} catch (e) {
		next(e);
	}
});
module.exports = router;
