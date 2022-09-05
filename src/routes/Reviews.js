const { Router } = require('express');
const { Product, User, Review } = require('../db.js');

const router = Router();

router.delete('/delete/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		await Review.destroy({
			where: { id: id }
		});
		res.send({ msg: 'review eliminada' });
	} catch (e) {
		next(e);
	}
});

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
			return res.send("comentario agregado con éxito");
		} else {
			res.status(400).json({ message: 'EMAIL o ID_PRODUCT no encontrado' });
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;
