const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING
			},
			surname: {
				type: DataTypes.STRING
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			img: {
				type: DataTypes.STRING
			},
			age: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW
			},
			province: {
				type: DataTypes.STRING
			},
			location: {
				type: DataTypes.STRING
			},
			postal: {
				type: DataTypes.INTEGER
			},
			telephone: {
				type: DataTypes.INTEGER
			},
			extra: {
				type: DataTypes.STRING
			},
			admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			ban: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},

			favorite: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: []
			}
		},
		{ timestamps: false }
	);
};
