const { Router } = require('express');
// const { Product, Category } = require('../db.js');
// const allInfo = require('./info.json');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { User, Product } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
	return res.send('Funciona');
});

module.exports = router;
