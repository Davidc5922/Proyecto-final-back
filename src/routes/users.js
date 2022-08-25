const { Router } = require('express');
const { findByName } = require('../Controllers/user');
const router = Router();
const { User } = require('../db');

router.post('/post', async (req, res) => {
	let { name, surname, username, email, age, location } = req.body;
	try {
		const user = await findByName(username); //si ya existe el nombre de usuario debo poner otro
		if (user.length) {
			return res
				.status(300)
				.send('el nombre de usuario ya existe, porfavor intenta con otro');
		} else {
			await User.create({
				name,
				surname,
				username,
				email,
				age,
				location
			});
			res.status(200).send('User created!!');
		}
	} catch (e) {
		res.send(e);
	}
});

router.put('/ban/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		let user = await User.findByPk(id);
		await user.update({
			...user,
			ban: user.ban === false ? true : false
		});
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
