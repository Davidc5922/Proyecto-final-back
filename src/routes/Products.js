const { Router } = require('express');
// const allInfo = require('./info.json');
// const { Product, Category } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { User, Product } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
	res.send('funciona :D');
});

module.exports = router;
