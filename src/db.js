require("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require("fs");
const path = require("path");

let sequelize = new Sequelize.Sequelize(
  "gaedatabase",
  "gaeduser",
  "Tsubasa12345",
  {
    host: "proyecto-final-database.ccwb3jesmh0z.us-east-1.rds.amazonaws.com",
    ssl: true,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {User, Product, Buy, Category, Review} = sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Buy);
Buy.belongsTo(User);

Product.belongsToMany(Buy, {through: "Products_Buys"});
Buy.belongsToMany(Product, {through: "Products_Buys"});

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
