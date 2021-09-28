///////////CRÉATION ROUTERS/////////////
//IMPORTER EXPRESS
const express = require('express');

//CRÉER ROUTER (MÉTHODE ROUTER D'EXPRESS)
const router = express.Router();

//IMPORTER TOKEN VÉRIFICATION
const auth = require('../middleware/auth');
//IMPOTER MULTER CONFIGURÉ
const multer = require('../middleware/multer-config');

//IMPOTER CONTROLLER ITEM PR ASSOCIER F. AUX DIFF.ROUTES
const itemCtrl = require('../controllers/item');

// CRÉER ROUTES
router.post('/', auth, multer, itemCtrl.createSauce);
router.post('/:id/like', auth, itemCtrl.likeOrNot);
router.put('/:id', auth, multer, itemCtrl.modifySauce);
router.delete('/:id', auth, itemCtrl.deleteSauce);
router.get('/:id', auth, itemCtrl.getOneSauce);
router.get('/', auth, itemCtrl.getAllSauce);

//EXPORTER ROUTER
module.exports = router;