/* 
Imports
*/
// NodeJS
const { Router } = require('express'); // extraire des classes

// Inner
const { FrontRouterClass } = require(`./front/front.routes`);
const { ApiRouterClass } = require(`./api/api.routes`);
//

/*
Configuration
*/ 
  // Parent
  const mainRouter = Router();

  // Child
  const frontRouter = new FrontRouterClass();
  const apiRouter = new ApiRouterClass();

  // Routes
  mainRouter.use( `/api`,apiRouter.init() );
  mainRouter.use( `/`,frontRouter.init() );
//

/*
Export
*/
module.exports = { mainRouter }; 
//