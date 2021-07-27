/* imports */
require('dotenv').config(); // Variable d'environnement 
const express = require('express') // module important config du serv.
var fs = require('fs')
var https = require('https')
//Inner
const { mainRouter } = require(`./routes/main.router`);

/* Configuration */
const server = express();
const port = process.env.PORT;
server.use(`/`, mainRouter);

/* Lancer le serveur */
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}.`)
// });

https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')
}, server)
.listen(port, function () {
  console.log(`Server listening on port ${port}.`)
})