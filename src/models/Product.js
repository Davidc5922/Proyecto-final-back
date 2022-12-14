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
				type: DataTypes.FLOAT,
				allowNull: false
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			},
			sold: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			size: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true
			},
			score: {
				type: DataTypes.FLOAT,
				defaultValue: 0
			},
			genre: {
				type: DataTypes.STRING,
				allowNull: false
			},
			review: {
				type: DataTypes.STRING,
				get() {
					return JSON.parse(this.getDataValue('review'));
				},
				set(val) {
					return this.setDataValue('review', JSON.stringify(val));
				}
			},
			offer: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			discount: {
				type: DataTypes.STRING,
				defaultValue: false
			}
		},
		{ timestamps: false }
	);
};