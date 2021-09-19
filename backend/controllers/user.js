//IMPORTER BCRYPT PR HACHER
const bcrypt = require("bcrypt");
//IMPORTER PACKAGE TOKEN (LES CRÉER/LES VÉRIFIER)
const jwt = require('jsonwebtoken');
//IMPORTER MODEL USER
const User = require("../models/User");
 

//////////////CRÉER FONCTION (MIDDLEWARE) PR RÉPONDRE À TOUT TYPE DE REQ.
//PR NEW USER
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//CRYPTER SUR 10 TOURS => PROMISE
    .then(hash => {//CRÉER NEW USER
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()//SAVE NEW USER DS B DE D => PROMISE
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};

//PR ALREADY USER + CRÉER TOKEN
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })//RÉCUPÉRER USER (MÉTHODE FIND ONE) => PROMISE
    .then(user => {//SI USER PAS TROUVÉ
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)//COMPARER M DE P DE CONNEXION AVEC ORIGINAL
        .then(valid => {
          if (!valid) {//SI NON VALIDE
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(//F. PREND EN ARG.
              { userId: user._id },//1ER : DONNÉES À ENCODER DS TOKEN (PAY LOAD)
              'RANDOM_TOKEN_SECRET',//2EME : CLÉ SECRÈTE D'ENCODAGE OU
              /*`${process.env.RND_TKN}`, */
              { expiresIn: '24h' }//3EME: CONFIGUER TPS D'EXPIRATION 
            )
          });
        })
        .catch(error => res.status(500).json({ error }));//PR ERR SERVER UNIQMT
    })
    .catch(error => res.status(500).json({ error }));//PR ERR SERVER UNIQMT
};