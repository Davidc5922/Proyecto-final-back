const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'product',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			brand: {
				type: DataTypes.STRING,
				allowNull: false
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			stock: {
				type: DataTypes.STRING,
				allowNull: false
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			},
			sold: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			size: {
				type: DataTypes.STRING,
				allowNull: false
			},
			score: {
				type: DataTypes.STRING,
				allowNull: false
			},
			genre: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{ timestamps: false }
	);
};