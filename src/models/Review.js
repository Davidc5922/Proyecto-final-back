const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'review',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			data: {
				type: DataTypes.STRING,
				get() {
					return JSON.parse(this.getDataValue('data'));
				},
				set(val) {
					return this.setDataValue('data', JSON.stringify(val));
				}
			}
		},
		{ timestamps: false }
	);
};
