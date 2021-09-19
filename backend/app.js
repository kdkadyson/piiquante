//////////////////GÉRER TTES REQ. SEND AU SERVER///////////////
//IMPORTER EXPRESS
const express = require('express');
//IMPORTER BODY PARSER
const bodyParser = require('body-parser');

//IMPORTER MONGOOSE
const mongoose = require('mongoose');

//IMPORTER ROUTER ITEM
const itemRoutes = require('./routes/item');
//IMPORTER ROUTER USER
const userRoutes = require('./routes/user');

//IMPORTER PATH PR ACCÉDER AU FICHIER IMAGES
const path = require('path');


//CRÉER APP
const app = express();

//CONNECTER MONGOOSE AVEC ROUTE MONGO DB
mongoose.connect("mongodb+srv://kadyson:princess99@clusterpiment.zrkhy.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//SAVE SD APP
//////////ROUTES => CRÉER FONCTION GÉNÉRALES (MIDDLEWARE) PR RÉPONDRE À TOUT TYPE DE REQ.(MÉTHODE USE) 
//PR APPLI. ACCÉDE SS PROB. À L'API (CORS SECURITY) MIDDLEWARE GÉNÉRAL SS ROUTE SPÉCIFIQUE, APPLIQUÉ À TTES ROUTES DU SERVER
app.use((req, res, next) => { //UTILISER HEADERS DS OBJET RES. *** .USE TRAITE TTES LES REQ.
    res.setHeader('Access-Control-Allow-Origin', '*');//TT LE MONDE
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')//AUTORISATION DE USE CERTAINS HEADERS SUR OBJET REQ.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//AUTORISATION PR CERTAINES METHODES DE REQ.
    next();
});

//PR USE MÉTHODE DE BODY PARSER => BODY REQ EN JS
app.use(bodyParser.json()); 

//PR USE IMAGES STATIC
app.use('/images', express.static(path.join(__dirname, 'images')));//REQ IMG SERA SERVI DU DOSSIER STATIC IMG ET Y JOINDRE LE NEW FICHIER

//PR ROUTE ITEM
app.use('/api/item', itemRoutes);
//PR ROUTE USER
app.use('/api/auth', userRoutes);

//EXPORTER APPLI pr être use depuis ts les fichiers
module.exports = app;