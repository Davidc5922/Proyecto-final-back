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
				type: DataTypes.STRING,
				allowNull: false
			},
			surname: {
				type: DataTypes.STRING,
				allowNull: false
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
				type: DataTypes.INTEGER
			},

			location: {
				type: DataTypes.STRING
			},
			admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			ban: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		{ timestamps: false }
	);
};
