const { Router } = require('express');
const users = require('./users');
const Products = require('./Products.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', users);
router.use('/products', Products);

module.exports = router;
