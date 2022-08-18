const { Router } = require('express');
const uuid = require('uuid');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { User, Product } = require('../db');

const router = Router();
const allInfo = require('./info.json');
const { Product, Category } = require('../db.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const preload = async () => {
// 	let categories = [
// 		{ name: 'calzado' },
// 		{ name: 'camiseta' },
// 		{ name: 'buzo' },
// 		{ name: 'pantalon' },
// 		{ name: 'campera' }
// 	];
// 	await Category.bulkCreate(categories);
// 	// categories.forEach((e) => {
// 	// 	Category.findOrCreate({
// 	// 		where: {
// 	// 			id: uuid.v4(),
// 	// 			name: e.name
// 	// 		}
// 	// 	});
// 	// });
// 	let mapInfo = allInfo.map(async (p) => {
// 		// const categoryDb = await Category.findAll({
// 		// 		where: { name: p.category }
// 		// 	});
// 		// 	await newProduct.addCategory(categoryDb);
// 		return {
// 			name: p.name,
// 			brand: p.brand,
// 			price: p.price,
// 			stock: p.stock,
// 			image: p.image,
// 			sold: p.sold,
// 			size: p.size,
// 			score: p.score,
// 			genre: p.genre
// 		};
// 	});
// 	await Product.bulkCreate(mapInfo);

// 	// console.log(mapInfo);
// };

router.get('/', async (req, res) => {
	// await preload();
	res.send('funciona :D');
});

module.exports = router;
