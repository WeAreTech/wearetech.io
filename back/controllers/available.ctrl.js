/**
 * @fileOverview GET /available page.
 */
var validator = require('validator');
var log = require('logg').getLogger('app.ctrl.Register');
var ControllerBase = require('nodeon-base').ControllerBase;

var CityEntity = require('../entities/city.ent');

/**
 * Check for city availability
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Available = module.exports = ControllerBase.extendSingleton(function () {
  this.use.push(this._registerNewCity.bind(this));
});

Available.prototype._registerNewCity = function (req, res) {
  if (req.method === 'GET') {
    this._getAvailableView(req, res);
    return;
  }

  var userCity = CityEntity.getInstance();

  /**
   * @check if city is available
   */
  var maxDistance = 10;
  var geo = [22.944419100000005, 40.6400629];

  var lonLat = {$geometry: {type: 'Point', coordinates: geo}};

  userCity.read({
    geo: {
      $near: lonLat,
      $maxDistance: maxDistance
    }
  }).bind(this)
    .then(function (result) {
      if (!result) {

        /**
         * Create new
         */

        // perform basic sanitizations, validation happens in model.
        var params = {
          fullName: validator.toWebstring(req.body.name, 32),
          canonicalName: validator.toWebstring(req.body.cityCanonicalName, 64),
          countryCode: validator.toWebstring(req.body.cityCountryCode, 2),
          lat: req.body.cityLat,
          lng: req.body.cityLng,
        };

        log.info('_registerNewCity() :: New city register:', params.email);

        userCity.register(params)
          .then(this._newUser.bind(this, req, res))
          .catch(function (err) {
            log.warn('_useRegister() :: New user fail:', err.message);
            res.status(400).render('user/register', {
              error: true,
              errorMessage: err.message,
            });
            return;
          });

        req.flash('cityCanonicalName', req.body.cityCanonicalName);

        res.redirect('/register');

      } else {
        /**
         * We have an overlap
         */
        res.render('city/available', {
          available: false,
          cityId: result
        });
      }
    });

};

Available.prototype._getAvailableView = function (req, res) {
  res.render('city/available');
};
