const { Router } = require('express');
const { findByName } = require('../Controllers/User_C.js');
const router = Router();
const { User } = require('../db');

router.get('/user/:email', async (req, res) => {
	try {
		const { email } = req.params;
		const user = await User.findOne({ where: { email: email } });
		console.log(user);
		let bool = false;

		if (user) {
			return res.send(user);
		} else {
			return res.send(false);
		}
	} catch (e) {
		console.log(e);
	}
});

router.post('/post', async (req, res) => {
	let { given_name, family_name, nickname, email } = req.body;

	try {
		const user = await User.findOne({ where: { email: email } }); //si ya existe el nombre de usuario debo poner otro
		console.log(typeof user);
		if (user) {
			console.log(user);
			return res.status(200).send(user);
		} else {
			let newUser = await User.create({
				name: given_name,
				surname: family_name,
				username: nickname,
				email: email
			});
			res.status(200).json(newUser);
		}
	} catch (e) {
		res.send(e);
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
