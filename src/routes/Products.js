const { Router } = require('express');

const {
	filterByGenre,
	filterByCategory,
	getAllProducts,
	filterBySize,
	filterByBrand,
	filterByName
} = require('../Controllers');
const { Product, Category, User } = require('../db.js');

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
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			let productDetail = await Product.findByPk(id);
			if (productDetail) {
				let categoryDb = await Category.findByPk(productDetail.categoryId);
				const concatProduct = {
					...productDetail.dataValues,
					categoryName: categoryDb.name
				};
				res.status(200).json(concatProduct);
			} else {
				return res.status(200).json({ message: 'ID not found' });
			}
		}
	} catch (error) {
		next(error);
	}
});

router.delete('/delete/:id', async function (req, res) {
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

router.post('/', async (req, res, next) => {
	let { name, brand, price, stock, image, sold, size, score, genre, category } =
		req.body;
	try {
		let catId = await Category.findOne({ where: { name: category } });
		await Product.create({
			name: name,
			brand: brand,
			price: parseFloat(price),
			stock: parseInt(stock),
			image: image,
			sold: parseInt(sold),
			size: size,
			score: parseFloat(score),
			genre: genre,
			categoryId: catId.id
		});
		res.status(200).json({ message: 'New Product Created!' });
	} catch (e) {
		next(e);
	}
});

router.put('/change/:id', async (req, res) => {
	let { name, brand, price, stock, image, sold, size, score, genre, category } =
		req.body;
	let { id } = req.params;
});

module.exports = router;
