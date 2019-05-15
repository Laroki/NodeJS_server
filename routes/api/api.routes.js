/*
Imports
*/
const express = require('express');
const apiRouter = express.Router();
//

/*
Configuration
*/
class ApiRouterClass { // class commence par une maj uppercamelcase
  constructor() {}; 
  routes() {
    // Configurer la homepage de l'api
    apiRouter.get(`/`, (req, res) => { // requette, response
      // Renvoyer des données en JSON
      res.json( {msg: `Hello API`, data: [`NodeJS`,`API`,`SARAHGUNGOR`]} );
      
    });

    apiRouter.get(`/jason`, (req, res) => { // requette, response
      // Renvoyer des données en JSON
      res.json( {msg: `Hello jason`} );
      
    });
  };


  init() {
    // Lancer la méthode routes
    this.routes();
    // Renvoyer le router
    return apiRouter;
  };
}
//

/*  
Export
*/

module.exports = {
  ApiRouterClass
};
//