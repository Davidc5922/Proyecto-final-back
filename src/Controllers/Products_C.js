const axios = require("axios");
const { Product, Category } = require('../db.js');
// const allInfo = require('../routes/info.json');

const preload = async () => {
	let categories = [
		{ name: 'calzado' },
		{ name: 'camiseta' },
		{ name: 'buzo' },
		{ name: 'pantalon' },
		{ name: 'campera' }
	];
	await Category.bulkCreate(categories);

	const allData = await axios.get("https://apimocha.com/gaedjm/products");
	allData.data.forEach(async (p) => {
		let categoryDb = await Category.findOne({
			where: { name: p.category }
		});

		await Product.create({
			name: p.name,
			brand: p.brand,
			price: p.price,
			stock: p.stock,
			image: p.image,
			sold: p.sold,
			size: p.size,
			score: p.score,
			genre: p.genre,
			categoryId: categoryDb.id
		});
	});
};

module.exports = { preload };
