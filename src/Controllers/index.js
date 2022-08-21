const e = require('express');
const { Product, Category } = require('../db');

const getAllProducts = async function () {
	try {
		const allInfo = await Product.findAll();

		return allInfo.map((el) => ({
			id: el.id,
			name: el.name,
			price: el.price,
			image: el.image,
			price: el.price
		}));
	} catch (error) {}
};

const filterByCategory = async (category) => {
	try {
		const Id = await Category.findOne({
			where: { name: category }
		});

		const allInfo = await Product.findAll();
		const filterByCategory = allInfo.filter((el) => el.categoryId === Id.id);

		return filterByCategory.map((el) => ({
			id: el.id,
			name: el.name,
			brand: el.brand,
			image: el.image,
			price: el.price
		}));
	} catch (e) {}
};

const filterByGenre = async (genre) => {
	try {
		const allInfo = await Product.findAll();
		const FilerByGenre = allInfo.filter((e) => e.genre === genre);
		return FilerByGenre.map((el) => ({
			id: el.id,
			name: el.name,
			brand: el.brand,
			image: el.image,
			price: el.price
		}));
	} catch (e) {
		console.log(e);
	}
};

const filterBySize = async (size) => {
	const AllProducts = await Product.findAll();
	if (typeof size === 'string') {
		const infoFilter = AllProducts.filter((el) =>
			el.size.includes(size.toUpperCase())
		);
		return infoFilter.map((el) => ({
			id: el.id,
			name: el.name,
			brand: el.brand,
			image: el.image,
			price: el.price
		}));
	} else {
		const infoFilter = AllProducts.filter((el) =>
			el.size.includes(ParseInt(size))
		);
		return infoFilter.map((el) => ({
			id: el.id,
			name: el.name,
			brand: el.brand,
			image: el.image,
			price: el.price
		}));
	}
};

const filterByBrand = async (brand) => {
	try {
		const allInfo = await Product.findAll();
		const productsFilter = allInfo.filter((el) => el.brand === brand);
		return productsFilter.map((el) => ({
			id: el.id,
			name: el.name,
			brand: el.brand,
			image: el.image,
			price: el.price
		}));
	} catch (error) {}
};

module.exports = {
	filterByGenre,
	filterByCategory,
	getAllProducts,
	filterBySize,
	filterByBrand
};
