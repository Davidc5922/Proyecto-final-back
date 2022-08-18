const { Product, Category } = require('../db.js');
const allInfo = require('../routes/info.json');

const preload = async () => {
	let categories = [
		{ name: 'calzado' },
		{ name: 'camiseta' },
		{ name: 'buzo' },
		{ name: 'pantalon' },
		{ name: 'campera' }
	];
	await Category.bulkCreate(categories);
	// categories.forEach((e) => {
	// 	Category.findOrCreate({
	// 		where: {
	// 			id: uuid.v4(),
	// 			name: e.name
	// 		}
	// 	});
	// });
	let mapInfo = allInfo.map((p) => {
		// const categoryDb = await Category.findAll({
		// 		where: { name: p.category }
		// 	});
		// 	await newProduct.addCategory(categoryDb);
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
};

module.exports = { preload };
