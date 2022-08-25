const { Router } = require('express');
const users = require('./users');
const Products = require('./Products.js');
const Scores = require('./Scores.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', users);
router.use('/products', Products);
router.use('/scores', Scores);

module.exports = router;
