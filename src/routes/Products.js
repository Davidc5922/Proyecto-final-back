const { Router } = require('express');
const uuid = require('uuid');
const { filterByGenre, filterByCategory } = require('../Controllers/filters');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { User, Product } = require('../db');
const router = Router();


router.get('/genres/:genre', async (req, res) => {
	try {
		const {genre} = req.params
		console.log(genre)
	    const info = await filterByGenre(genre)
        res.status(200).send(info)
	} catch (error) {
		res.status(400).send(error)
	}
	
});

router.get("/category/:category", async (req,res) => {
	try {
		const {category} = req.params;
		console.log(category)
        const info = await filterByCategory(category)
        res.status(200).send(info)
	} catch (e) {
		res.status(400).send(e)
	}
})


module.exports = router;
