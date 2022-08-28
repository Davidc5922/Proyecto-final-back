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
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			const productDetail = await Product.findByPk(id);

			if (productDetail) {
				let sum = 0;
				let total = 0;
				let categoryDb = await Category.findByPk(productDetail.categoryId);

				if (productDetail.review) {
					productDetail.review.forEach((e) => {
						sum += e.number;
					});
					total =
						(sum + productDetail.score) / (productDetail.review.length + 1);
				} else {
					total = productDetail.score;
				}

				const concatProduct = {
					...productDetail.dataValues,
					review: JSON.parse(productDetail.dataValues.review),
					categoryName: categoryDb.name,
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
			sold,
			size,
			score,
			genre,
			offer,
			category
		} = req.body;
		if (
			name &&
			brand &&
			price &&
			stock &&
			image &&
			sold &&
			size &&
			score &&
			genre &&
			category
		) {
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
				offer: offer,
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
		let { name, brand, price, stock, image, sold, size, score, genre } =
			req.body;
		if (
			id &&
			name &&
			brand &&
			price &&
			stock &&
			image &&
			sold &&
			size &&
			score &&
			genre
		) {
			let product = await Product.findByPk(id);
			await product.update({
				...product,
				name: name,
				brand: brand,
				price: parseFloat(price),
				stock: parseInt(stock),
				image: image,
				sold: parseInt(sold),
				size: size,
				score: parseFloat(score),
				genre: genre
			});
			res.status(200).json({ message: 'Successfully modified product!' });
		} else {
			res.status(400).json({ message: 'Error could not modify the product!' });
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;
