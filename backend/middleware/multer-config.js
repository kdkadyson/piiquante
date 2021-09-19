///////////////GESTION TÉLÉCHARGEMENT FICHIERS ENTRANTS/////////////////////
//IMPOTER MUTER 
const multer = require('multer');

//OBJET DES DIFF. MIME TYPES
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
 
//CRÉER OBJET DE CONFIG. PR MULTER
const storage = multer.diskStorage({//PR SAVE SUR DISK AVEC 2 ELEMT
    destination: (req, file, callback) => {//1ERE DS KEL FOLDER SAVE FICHIER AVEC 3 ARG.
      callback(null, 'images');//NO ERR + NOM FOLDER
    },
    filename: (req, file, callback) => {//2EME KEL NEW NOM DE FICHIER USE
      const name = file.originalname.split(' ').join('_');//REMPLACER ESPACE AVEC UNDERX-SCORE 
      const extension = MIME_TYPES[file.mimetype];//GÉNÉRER EXTENTION FICHIER
      callback(null, name + Date.now() + '.' + extension);//NO ERR + FICHIER NOM AVEC TIMESTAMP (+UNIQUE À LA MS PRET) +  EXT.
    }
});
 
  //EXPOTER MULTER CONFIGURÉ
  module.exports = multer({storage: storage}).single('image');//FICHIER UNIQUE ET SEULMT FICHIER IMAGE