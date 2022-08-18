const { Router } = require('express');
const uuid = require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { User, Product } = require('../db');

const router = Router();
const allInfo = require('./info.json');
const { Product } = require('../db.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function preload() {
	let mapInfo = allInfo.map((p) => {
		return {
			name: p.name,
			brand: p.brand,
			price: p.price,
			stock: p.stock,
			image: p.image,
			sold: p.sold,
			size: p.size,
			score: p.score,
			genre: p.genre
		};
	});
	await Product.bulkCreate(mapInfo);

	// console.log(mapInfo);
}

router.get('/', async (req, res) => {
	await preload();
	res.send('funciona :D');
});

module.exports = router;
