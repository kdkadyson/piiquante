//LIMITER NBRE TENTATIVE CONNEXTION
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,//INTERVAL CONNEXTION EN MN
    max: 3,//MAX CONNEXTION
    message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
});

//EXPORTER LMITER
module.exports = { limiter };