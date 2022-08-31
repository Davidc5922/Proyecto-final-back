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
					return res.json({ message: 'tu ya haz votado éste producto' });
				}
			} else {
				result = await productDb.update({
					...productDb,
					review: data
				});
			}
			return res.status(200).json('comentario agregado');
		} else {
			res.status(400).json({ message: 'EMAIL or ID_PRODUCT not found' });
		}
	} catch (e) {
		next(e);
	}
});
