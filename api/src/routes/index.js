const e = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {User,Product} = require("../db")

const router = Router();
const allInfo = require("./info.json")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/products", async (req,res)=>{

    // allInfo.hombres.calzado.map(async el => {
    //     await Product.create({
    //         name: el.name,
    //         brand: el.marca,
    //         price: el.precio,
    //         stock: el.stock,
    //         genre: el.genero,
    //         image: el.img,
    //         sold: el.vendido,
    //         score: el.calificacion,
    //     })
    // });
     
     res.send("uwu")
    
})

module.exports = router;
