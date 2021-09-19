///////////CRÉATION ROUTERS/////////////
//IMPORTER EXPRESS
const express = require('express');

//CRÉER ROUTER (MÉTHODE ROUTER D'EXPRESS)
const router = express.Router();

//IMPORTER MIDDLEWARE LIMIT
const maxLoggin = require('../middleware/limit');

//IMPORTER CONTROLLER USER PR ASSOCIER F. AUX DIFF.ROUTES
const userCtrl = require('../controllers/user');

//CRÉER ROUTES POST USER
router.post('/signup', userCtrl.signup);
router.post('/login', maxLoggin.limiter, userCtrl.login);

//EXPORTER ROUTER
module.exports = router;