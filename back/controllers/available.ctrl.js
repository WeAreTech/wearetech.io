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

  /**
   * Not sure about the 100. But it works for 10KM meters
   * @see http://docs.mongodb.org/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
   */
  var distance = 1000  / 6371;

  /**
   * node-entity _read method does not support $near for some reason
   */

  var query = userCity.Model.findOne({'geo': {$near: [req.body.cityLat, req.body.cityLng], $maxDistance: distance}});
  query.exec(function (err, city) {
    if (err) {
      log.error('_registerNewCity() :: Error while searching for city availability:', err);
      throw err;
    }

    if (!city) {
      // perform basic sanitizations, validation happens in model.
      var params = {
        name: 'example',
        headerTitle: 'example',
        hostname: 'example',
        domainName: 'example',
        canonical: {
          fullName: validator.toWebstring(req.body.name, 32),
          canonicalName: validator.toWebstring(req.body.cityCanonicalName, 64),
          countryCode: validator.toWebstring(req.body.cityCountryCode, 2),
        },
        geo: [
          req.body.cityLng,
          req.body.cityLat
        ]
      };

      log.info('_registerNewCity() :: New city register:', params.email);
      var userCity = CityEntity.getInstance();
      userCity.register(params)
        .then(function (req, res, city) {
          /**
           * Pass the City Document to Register Controller
           */
          req.flash('cityCanonicalName', req.body.cityCanonicalName);
          req.flash('cityDocument', city);

          res.redirect('/register');
        }.bind(this, req, res))
        .catch(function (err) {
          log.warn('_registerNewCity() :: New city fail:', err.message);
          res.status(400).render('user/register', {
            error: true,
            errorMessage: err.message,
          });
          return;
        });

    } else {
      /**
       * We have an overlap
       */
      res.render('city/preview', {
        city: city
      });
    }
  }.bind(this));

};

Available.prototype._getAvailableView = function (req, res) {
  res.render('city/available');
};
