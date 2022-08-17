const e = require('express');
const { Router } = require('express');

const users = require('../controls/users.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {User} = require("../db")

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.use('/users',users)
const users = require('../controls/users.js')


router.get("/", async (req,res)=>{

    res.send("funciona :D")
   
})

router.get("/products", async (req,res)=>{

     res.send("ruta de prueba")
    
})

module.exports = router;
