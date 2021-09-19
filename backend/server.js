////////////////// CRÉATION DU SERVER ////////////////////
//IMPORTER PACKAGE HTTP NODE
const http = require('http');
//IMPORTER APP
const app = require('./app');

//SET APP SUR LE PORT
const normalizePort = val => {//F. RENVOI PORT VALIDE (NBR/STRING)
    const port = parseInt(val, 10);
    
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//DIRE À EXPRESS SUR QUEL PORT TOURNER (MÉTHODE APP.SET)
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port);

//RECHERCHER / GÉRER LES ERREURS PORT 
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1)
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1)
        break;
      default:
        throw error;
    }
  };

//CRÉER SERVER (MÉTHOE CREATE SERVER) QUI PREND EN ARG. LA F. QUI SERA CALL À CHQ REQ.
 const server = http.createServer(app);

//SAVE : F.ERRORHANDLER / EVENT LISTENER PORT
 server.on('error', errorHandler);
 server.on('listening', () => {
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
   console.log('Listening on ' + bind);
 });

//ÉCOUTER LES REQ SUR PORT
server.listen(port);