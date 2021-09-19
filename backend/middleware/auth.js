//CRÉATION MIDDLEWARE PR PROTÉGER ROUTE + VÉRIFIER TOKEN VALABLE/AUTH. USER AVEC TOKEN AVANT DE SEND REQ.
//IMPORTER TOKEN
const jwt = require('jsonwebtoken');

//////////////CRÉER FONCTION (MIDDLEWARE) PR REPONDE À TOUT TYPE DE REQ.
//PR VÉRICATION TOKEN 
module.exports = (req, res, next) => {//BLOCK TRY / CATCH CAR PLSR ELEMT À GÉRER
  try {
    const token = req.headers.authorization.split(' ')[1];//RÉCUPÉRER TOKEN (2EME ELEMT)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//DÉCODER TOKEN
    const userId = decodedToken.userId;//RÉCUPÉRER USER ID DU TOKEN
    if (req.body.userId && req.body.userId !== userId) {//VÉRIFIER SI USER ID REQ DIFF. USER ID TOKEN
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};