/*
Imports
*/
const express = require('express');
const frontRouter = express.Router();
//

/*
Configuration
*/
class FrontRouterClass { // class commence par une maj uppercamelcase
  constructor() {}; 
  routes() {
    // Configurer la homepage 
    frontRouter.get(`/`, (req, res) => { // requette, response
      // Rendre le fichier index
      res.render(`index`);
    });

    // Configurer la page info
    frontRouter.get(`/me`, (req, res) => { // requette, response
      // Rendre le fichier index
      res.render(`me`);
    });
  };


  init() {
    // Lancer la méthode routes
    this.routes();
    // Renvoyer le router
    return frontRouter;
  };
}
//

/*  
Export
*/

module.exports = {
  FrontRouterClass
};
//