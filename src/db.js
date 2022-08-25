require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, NODE_ENV = '' } = process.env;

let sequelize =
	NODE_ENV === 'production'
		? new Sequelize(process.env.DATABASE_URL, {
				database: 'dfi62j8579bdlr',
				dialect: 'postgres',
				host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
				port: 5432,
				username: 'alcxuckxfpobjq',
				password:
					'fc19afe34c5042d66b696c9c0f06ebfea88b6eae711c2b17b83d00bcd0f06e83',
				pool: {
					max: 3,
					min: 1,
					idle: 10000
				},
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false
					},
					keepAlive: true
				},
				ssl: true
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{ logging: false, native: false }
		  );

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1]
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Buy, Category, Score } = sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Buy);
Buy.belongsTo(User);

Product.belongsToMany(Buy, { through: 'Products_Buys' });
Buy.belongsToMany(Product, { through: 'Products_Buys' });

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Score);
Score.belongsTo(User);

Product.hasMany(Score);
Score.belongsTo(Product);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize // para importart la conexión { conn } = require('./db.js');
};
