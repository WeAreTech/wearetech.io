/**
 * @fileOverview GET /available page.
 */
var validator = require('validator');
var log = require('logg').getLogger('app.ctrl.Register');
var ControllerBase = require('nodeon-base').ControllerBase;

var CityApplicationEntity = require('../entities/city-application.ent');

/**
 * Check for city availability
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Available = module.exports = ControllerBase.extendSingleton(function () {
  this.use.push(this._registerNewCityApplication.bind(this));
});

Available.prototype._registerNewCityApplication = function (req, res) {
  if (req.method === 'GET') {
    this._getAvailableView(req, res);
    return;
  }

  var cityApplications = CityApplicationEntity.getInstance();
  /**
   * Not sure about the 100. But it works for 10KM meters
   * @see http://docs.mongodb.org/manual/tutorial/calculate-distances-using-spherical-geometry-with-2d-geospatial-indexes/
   */
  var distance = 1000 / 6371;

  var query = cityApplications.Model.findOne(
    {
      'geo': {
        $near: [req.body.cityLat, req.body.cityLng],
        $maxDistance: distance
      }
    }
  );
  query.exec(function (err, city) {
    if (err) {
      log.error('_registerNewCityApplication() :: Error while searching for city availability:', err);
      throw err;
    }

    if (!city) {
      var params = {
        geo: [
          req.body.cityLng,
          req.body.cityLat
        ],
        canonical: {
          canonicalName: validator.toWebstring(req.body.cityCanonicalName, 128),
          countryCode: validator.toWebstring(req.body.cityCountryCode, 4),
        }
      };

      log.info('_registerNewCityApplication() :: New city register:', params.canonical.canonicalName);
      var cityApplications = CityApplicationEntity.getInstance();
      cityApplications.register(params)
        .then(function (req, res, cityApplication) {
          console.log(cityApplication);
          /**
           * Pass the City Document to Register Controller
           */
          req.flash('cityApplicationId', cityApplication._id);

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
