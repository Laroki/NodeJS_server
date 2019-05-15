/* 
imports
*/
  //NodeJS
  require('dotenv').config(); // Variable d'environnement 
  const express = require('express') // module important config du serv.
  const ejs = require('ejs'); // Moteur de template.
  const path = require('path'); // Gestion du dossier client www.

  //Inner
  const { mainRouter } = require(`./routes/main.router`);

//

/*
Configuration
*/ 
  // Création d'une variable pour le serveur
  const server = express();
  // const port = XXXX  ne pas mettre le port en clair le mettre ds le fichier .env et l'appeler.
  const port = process.env.PORT;
  // Configurer le dossier www  
  server.set(`views`,__dirname + `/www`); //changer le nom view par www
  server.use( express.static(path.join(__dirname, `www`)) );
  //Configurer le moteur de rendu
  server.set( `view engine`, `ejs` ) // le client va utiliser .ejs au lieu de.html
  // Ajouter le router dans le server
  server.use(`/`, mainRouter);

  

/* 
Lancer le serveur
*/
  server.listen( port, () =>{
    console.log(`Server listening on port ${port}.`)
  } );
//