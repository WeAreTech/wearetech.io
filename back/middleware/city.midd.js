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

  // get the domain name out of the hostname
  var domainName = this.getDomainName(req.hostname);

  this.cityEnt.readOne({domainName: domainName})
    .bind(this)
    .then(function (result) {
      if (!result) {
        this.handleNotFound(req, res);
      } else {
        // check if there's a hostname match
        if (req.hostname === result.hostname) {
          // populate city
          req.city = result;
          res.locals.city = result;
          next();
        } else {
          // not a match, redirect to proper
          res.redirect(301, req.protocol + '://' + result.hostname);
        }
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
  res.status(404);
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
  res.status(500);
  if (req.is('json')) {
    if (err instanceof appError.Error) {
      req.json(err.toApi());
    } else {
      var localErr = new appError.Error(err);
      req.json(localErr.toApi());
    }
  } else {
    res.render('city/error/500', {error: err});
  }
};

/**
 * Returns the domain name of each hostname, last two parts.
 *
 * @param {string} hostname The hostname to parse.
 * @return {string} The last two parts representing the domain name.
 */
City.prototype.getDomainName = function (hostname) {
  var parts = hostname.split('.');
  return parts.slice(parts.length -2).join('.');
};
