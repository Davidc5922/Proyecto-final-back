const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {User,Product} = require("../db")

const router = Router();
const allInfo = require("./info.json")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('*',async(req, res,next) => {
    try {
        let list=await allInfo.hombres();
        
        res.status(200).send(list)
    } catch (e) {
        next(e);
    }
})
module.exports = router;
// id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
// },
// name: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// brand: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// price: {
//     type: DataTypes.INTEGER,
//     allowNull: false
// },
// stock: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// image: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// sold: {
//     type: DataTypes.INTEGER,
//     allowNull: false
// },
// size: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// score: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// genre: {
//     type: DataTypes.STRING,
//     allowNull: false
// }
// },