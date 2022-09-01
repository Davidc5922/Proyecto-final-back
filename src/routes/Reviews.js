const { Router } = require('express');
const { Product, User, Review } = require('../db.js');

const router = Router();

router.post('/create', async (req, res, next) => {
	try {
		const { email, idProduct, number, comment } = req.body;
		let userDb = await User.findOne({ where: { email: email } });
		let productDb = await Product.findByPk(idProduct);
		let reviewDb = await Review.findAll({ where: { productId: idProduct } });
		if (userDb && productDb) {
			let data = [
				{
					number: number,
					comment: comment
				}
			];
			if (reviewDb.length) {
				let filterEmail = reviewDb.filter((e) => userDb.id === e.userId);
				if (filterEmail.length) {
					return res.json({ message: 'tu ya haz votado éste producto' });
				}
			}
			let newReview = await Review.create({
				data: data,
				userId: userDb.id,
				productId: idProduct
			});
			return res.send(newReview);
		} else {
			res.status(400).json({ message: 'EMAIL or ID_PRODUCT not found' });
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;
