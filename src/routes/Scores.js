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
		let { email, idProduct, number } = req.body;
		let emailDb = await User.findOne({ where: { email: email } });
		let productDb = await Product.findByPk(idProduct);

		if (emailDb && productDb) {
			let data = [{ email: email, number: number }];
			let result;
			if (productDb.qualify) {
				let filterEmail = productDb.qualify.filter((e) => email === e.email);
				if (!filterEmail.length) {
					result = await productDb.update({
						...productDb,
						qualify: [...productDb.qualify, data[0]]
					});
				} else {
					return res.json({ message: 'You have already voted' });
				}
			} else {
				result = await productDb.update({
					...productDb,
					qualify: data
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

module.exports = router;
