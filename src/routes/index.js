const { Router } = require('express');
const express = require('express');
const users = require('./users.js');
const Products = require('./Products.js');
const Reviews = require('./Reviews.js');

const MercadoPago = require('./MercadoPago.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use(express.json());
router.use('/users', users);
router.use('/products', Products);
router.use('/reviews', Reviews);
router.use('/Checkout', MercadoPago);

module.exports = router;
