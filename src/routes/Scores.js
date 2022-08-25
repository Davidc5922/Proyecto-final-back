const { Router } = require('express');
const { Product, Category, User, Score } = require('../db.js');

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		let allUsers = await Score.findAll({
			attributes: ['number']
		});
		console.log(allUsers[0].number[0].name);
		return res.status(200).send(allUsers[0].number[0].name);
	} catch (e) {
		next(e);
	}
});

router.put('/', async (req, res, next) => {
	try {
		let { email, idProduct, number, comment } = req.body;
		let userDb = await User.findOne({ where: { email: email } });
		let productDb = await Product.findByPk(idProduct);

		if (userDb && productDb) {
			let data = [
				{
					username: userDb.username,
					email: email,
					number: number,
					comment: comment
				}
			];
			let result;
			if (productDb.review) {
				let filterEmail = productDb.review.filter((e) => email === e.email);
				if (!filterEmail.length) {
					result = await productDb.update({
						...productDb,
						review: [...productDb.review, data[0]]
					});
				} else {
					return res.json({ message: 'You have already voted' });
				}
			} else {
				result = await productDb.update({
					...productDb,
					review: data
				});
			}
			return res.status(200).json(result);
		} else {
			res.status(400).json({ message: 'EMAIL or ID_PRODUCT not found' });
		}
	} catch (e) {
		next(e);
	}
});

// router.put('/comment', async (req, res) => {
// 	try {
// 		const { idP, idU, text } = req.body;
// 		const productAndUser = await addCommentToProduct(idP, idU);
// 		const product = await Product.findByPk(productAndUser[0].id);
// 		const comment = {
// 			name: productAndUser[1].name,
// 			username: productAndUser[1].username,
// 			email: productAndUser[1].email,
// 			comment: text
// 		};
// 		let coments = product.comments.map((e) => {
// 			return JSON.parse(e);
// 		});
// 		let userComment = coments.filter(
// 			(e) =>
// 				e.username === productAndUser[1].name ||
// 				e.email === productAndUser[1].email ||
// 				e.username === productAndUser[1].username
// 		);
// 		if (!userComment.length) {
// 			const productPut = await product.update({
// 				...product,
// 				comments: [...product.comments, JSON.stringify(comment)]
// 			});

// 			res.send(productPut);
// 		} else {
// 			res.send('ya haz agregado tu opinion');
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

module.exports = router;
