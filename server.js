/* imports */
require('dotenv').config(); // Variable d'environnement 
const express = require('express') // module important config du serv.

//Inner
const { mainRouter } = require(`./routes/main.router`);

/* Configuration */
const server = express();
const port = process.env.PORT;
server.use(`/`, mainRouter);

/* Lancer le serveur */
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`)
});