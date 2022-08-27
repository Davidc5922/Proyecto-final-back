const { Router } = require('express');
const { findByName } = require('../Controllers/User_C.js');
const router = Router();
const { User } = require('../db');

router.get('/', async (req, res, next) => {
	try {
		let allUsers = await User.findAll();
		res.send(allUsers);
	} catch (e) {
		next(e);
	}
});

router.get('/:email', async (req, res, next) => {
	try {
		const { email } = req.params;
		const user = await User.findOne({ where: { email: email } });
		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(200).json({ message: 'EMAIL not found' });
		}
	} catch (e) {
		next(e);
	}
});

router.post('/post', async (req, res, next) => {
	let { given_name, family_name, nickname, email, picture } = req.body;

	try {
		const user = await User.findOne({ where: { email: email } }); //si ya existe el nombre de usuario debo poner otro
		console.log(typeof user);
		if (user) {
			console.log(user);
			return res.status(200).send(user);
		} else {
			let newUser = await User.create({
				name: given_name ? given_name : 'no tiene nombre',
				surname: family_name ? family_name : 'no tiene apellido',
				username: nickname ? nickname : 'no tiene nickname',
				email: email ? email : 'no tiene email',
				img: picture ? picture : 'no tiene imagen'
			});
			res.status(200).json(newUser);
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
