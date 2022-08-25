const { Router } = require('express');

const {
	filterByGenre,
	filterByCategory,
	getAllProducts,
	filterBySize,
	filterByBrand,
	filterByName,
	addCommentToProduct
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

router.put('/comment', async (req, res) => {
	try {
		const { idP, idU, text } = req.body;
		const productAndUser = await addCommentToProduct(idP, idU);
		const product = await Product.findByPk(productAndUser[0].id);
		const comment = {
			name: productAndUser[1].name,
			username: productAndUser[1].username,
			email: productAndUser[1].email,
			comment: text
		};
		let coments = product.comments.map((e) => {
			return JSON.parse(e);
		});
		let userComment = coments.filter(
			(e) =>
				e.username === productAndUser[1].name ||
				e.email === productAndUser[1].email ||
				e.username === productAndUser[1].username
		);
		if (!userComment.length) {
			const productPut = await product.update({
				...product,
				comments: [...product.comments, JSON.stringify(comment)]
			});

			res.send(productPut);
		} else {
			res.send('ya haz agregado tu opinion');
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			const productDetail = await Product.findByPk(id);

			if (productDetail) {
				let categoryDb = await Category.findByPk(productDetail.categoryId);

				const concatProduct = {
					...productDetail.dataValues,
					categoryName: categoryDb.name,
					comments: productDetail.comments.map((e) => {
						return JSON.parse(e);
					})
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
