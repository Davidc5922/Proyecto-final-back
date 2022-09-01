const { Product, Category, User } = require('../db');
var currentInfo;

const getAllProducts = async function () {
	try {
		currentInfo = await Product.findAll();
		currentInfo = currentInfo.map((el) => ({
			id: el.id,
			name: el.name,
			price: el.price,
			image: el.image,
			genre: el.genre,
			categoryId: el.categoryId,
			size: el.size,
			brand: el.brand,
			offer: el.offer,
			discount: el.discount
		}));
		return currentInfo;
	} catch (e) {
		console.log(`Error function getAllProducts: ${e}`);
	}
};

const filterByName = async (name) => {
	try {
		currentInfo = currentInfo.filter((e) =>
			e.name.toLowerCase().includes(name.toString().toLowerCase())
		);
		return currentInfo;
	} catch (e) {
		console.log(`Error function filterByName: ${e}`);
	}
};

const filterByCategory = async (category) => {
	try {
		const Id = await Category.findOne({
			where: { name: category }
		});
		currentInfo = currentInfo.filter((el) => el.categoryId === Id.id);
		return currentInfo;
	} catch (e) {
		console.log(`Error function filterByCategory: ${e}`);
	}
};

const filterByGenre = async (genre) => {
	try {
		currentInfo = currentInfo.filter((e) =>
			e.genre.includes(genre.toLowerCase())
		);
		return currentInfo;
	} catch (e) {
		console.log(`Error function filterByGenre: ${e}`);
	}
};

const filterBySize = async (size) => {
	try {
		if (typeof size === 'string') {
			currentInfo = currentInfo.filter((e) =>
				e.size.includes(size.toUpperCase())
			);
			return currentInfo;
		} else {
			currentInfo = currentInfo.filter((e) => e.size.includes(parseInt(size)));
			return currentInfo;
		}
	} catch (e) {
		console.log(`Error function filterBySize: ${e}`);
	}
};

const filterByBrand = async (brand) => {
	try {
		currentInfo = currentInfo.filter((e) =>
			e.brand.toLowerCase().includes(brand.toLowerCase())
		);
		return currentInfo;
	} catch (e) {
		console.log(`Error function filterByBrand: ${e}`);
	}
};

const addCommentToProduct = async (ProductId, UserId) => {
	try {
		const product = await Product.findByPk(ProductId);
		const user = await User.findByPk(UserId);
		return [product, user];
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	filterByGenre,
	filterByCategory,
	getAllProducts,
	filterBySize,
	filterByBrand,
	filterByName,
	addCommentToProduct
};
