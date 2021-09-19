//CRÉATION DU CONTROLLER DE TOUTE LA LOGIQUE DES ROUTES

//IMPORTER SAUCE
const Sauce = require('../models/Sauce');
//IMPORTER FICHIERS NODE (FILL SYSTEM) PR DELETE FICHIER
const fs = require('fs');

/////////////////////CRÉER FONCTION (MIDDLEWARE) PR RÉPONDRE À TOUT TYPE DE REQ.
//PR GET ALL SAUCES (READ)
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

//PR GET 1 SAUCE (READ)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
  };

//PR POST NEW SAUCE + SAVE
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);//car fichier img
  delete sauceObject._id;//DELETE SAUCE CRÉÉE
  const sauce = new Sauce({
        ...sauceObject,//RACCOURCI OPÉRATOR SPREAD
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//URL IMG GÉNÉRÉ PAR MULTER PR FRONTEND
      });//ELEMT DYNAMIK PR RÉCUPÉRER LES ELEMT URL
      sauce.save()// => PROMISE
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

//PR PUT (UPDATE) SAUCE
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?//SI MODIF. IMG
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }//sinon
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//1ER:KEL ITEM EST MODIF. 2EME:NEW ITEM + BON ID
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(403).json({ error }));
};

//PR SUPPRIMER (DELETE)
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })//RÉCUPÉRER FICHIER 
  .then(sauce => { //EXTRAIRE NOM FICHIER 
    const filename = sauce.imageUrl.split('/images/')[1];//AVEC 2 ELEMT AV/AP IMG(URL 0 /NON FICHIER 1)
    fs.unlink(`images/${filename}`, () => {//DELETE FICHIER + CALLBACK =>
      Sauce.deleteOne({ _id: req.params.id })//DELETE SAUCE DE B DE D
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

//PR LIKE / DISLIKE SAUCE
exports.likeOrNot = (req, res, next) => {
  if (req.body.like === 1) {//PR AJOUTER 1 LIKE/ITEM + LIER AVEC USER
      Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
          .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
          .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) {//PR AJOUTER 1 DISLIKE/ITEM + LIER AVEC USER
      Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
          .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
          .catch(error => res.status(400).json({ error }));
  } else {
      Sauce.findOne({ _id: req.params.id })
          .then(sauce => {//PR DELETE 1 LIKE/ITEM + LIER AVEC USER
              if (sauce.usersLiked.includes(req.body.userId)) {
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                      .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
                      .catch(error => res.status(400).json({ error }));
              } else if (sauce.usersDisliked.includes(req.body.userId)) {//PR DELETE 1 DISLIKE/ITEM + LIER AVEC USER
                  Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                      .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                      .catch(error => res.status(400).json({ error }));
              }
          })
          .catch(error => res.status(400).json({ error }));
  }
}
