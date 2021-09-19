//IMPORTER MONGOOSE
const mongoose = require('mongoose');
//IMPORTER PACKAGE UNIQUE VALIDATOR
//PR ÉVITER ERREUR MONGO DB
const uniqueValidator = require('mongoose-unique-validator');

//CRÉER SCHÉMA DE DONNÉES (F. .SCHÉMA DU PACKAGE MONGOODE)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },//PR QU'1 USER USE SEUL ADRESSE MAIL
  password: { type: String, required: true }
});

//APPLIQUER UNIQUE VALIDATOR AU SCHÉMA AVANT D'EN FAIRE UN MODÈLE (MÉTHODE PLUGIN)
userSchema.plugin(uniqueValidator);

//EXPORTER MODEL USER (MÉTHODE MODULE.EXPORTS)
module.exports = mongoose.model('User', userSchema);