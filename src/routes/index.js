const { Router } = require('express');
// Importar todos los routers;
const countries = require('./countries')
const activity = require('./activity')
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries',countries)
router.use('/activity',activity)


module.exports = router;
