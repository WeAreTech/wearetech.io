/**
 * @fileOverview City Middleware.
 */
var MiddlewareBase = require('nodeon-base').MiddlewareBase;
var appError = require('nodeon-error');

var CityEntity = require('../entities/city.ent');

// var log = require('logg').getLogger('app.midd.City');

/**
 * The City Middleware.
 *
 * @contructor
 * @extends {app.Middleware}
 */
var City = module.exports = MiddlewareBase.extendSingleton(function () {
  this.cityEnt = null;
});

/**
 * Initialize the middleware.
 *
 */
City.prototype.init = function() {
  this.cityEnt = CityEntity.getInstance();
};

/**
 * City Middleware
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function(Error=)} next passing control to the next middleware.
 */
City.prototype.populate = function(req, res, next) {
  this.cityEnt.readOne({hostname: req.hostname})
    .bind(this)
    .then(function (result) {
      if (!result) {
        this.handleNotFound(req, res);
      } else {
        // populate city
        req.city = result;
        next();
      }
    })
    .catch(function(err) {
      this.handleError(err, req, res);
    });
};

/**
 * Handle city not found cases.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
City.prototype.handleNotFound = function(req, res) {
  req.status(404);
  if (req.is('json')) {
    var err = new appError.Error('City not found');
    req.json(err.toApi());
  } else {
    res.render('city/error/city-not-found');
  }
};


/**
 * Handle city not found cases.
 *
 * @param {Error} The error thrown.
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
City.prototype.handleError = function(err, req, res) {
  req.status(500);
  if (req.is('json')) {
    if (err instanceof appError.Error) {
      req.json(err.toApi());
    } else {
      var localErr = new appError.Error(err);
      req.json(localErr.toApi());
    }
  } else {
    res.render('city/error/500', {err: err});
  }
};
