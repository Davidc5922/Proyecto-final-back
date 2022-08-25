const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'score',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			data: {
				type: DataTypes.STRING,
				get() {
					return JSON.parse(this.getDataValue('number'));
				},
				set(val) {
					return this.setDataValue('number', JSON.stringify(val));
				}
			}
		},
		{ timestamps: false }
	);
};
