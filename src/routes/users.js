const { Router } = require('express');

const { findUserByPk } = require('../Controllers/user');
const router = Router();
const { User } = require('../db');

router.post('/', async (req, res, next) => {
	let { email, password } = req.body;
	try {
		if (email && password) {
			let UserCreated = await User.create({
				email,
				password
			});
			res.status(200).send(UserCreated);
		}
	} catch (e) {
		next(e);
	}
});

router.put('/ban/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		let user = await User.findByPk(id);
		await user.update({
			...user,
			ban: user.ban === false ? true : false
		});
		res.send(user);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
