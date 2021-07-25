/* 
Imports
*/
// NodeJS
const { Router } = require('express'); // extraire des classes

const { ApiRouterClass } = require(`./api/api.routes`);
//

/*
Configuration
*/ 
  // Parent
  const mainRouter = Router();

  // Child
  const apiRouter = new ApiRouterClass();

  // Routes
  mainRouter.use( `/`,apiRouter.init() );
//

/*
Export
*/
module.exports = { mainRouter }; 
//