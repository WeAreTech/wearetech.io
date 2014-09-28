/**
 * @fileOverview City Middleware.
 */
var MiddlewareBase = require('nodeon-base').MiddlewareBase;

// var log = require('logg').getLogger('app.midd.City');

/**
 * The City Middleware.
 *
 * @contructor
 * @extends {app.Middleware}
 */
var City = module.exports = MiddlewareBase.extendSingleton();

/**
 * City Middleware
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function(Error=)} next passing control to the next middleware.
 */
City.prototype.populate = function(req, res, next) {
  console.log(req.hostname);
};
