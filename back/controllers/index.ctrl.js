/**
 * @fileOverview GET / Home page.
 */
var log = require('logg').getLogger('app.ctrl.Homepage');

var ControllerBase = require('nodeon-base').ControllerBase;

var CitiesEnt = require('../entities/city.ent');

/**
 * The home page.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Home = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._useIndex.bind(this));

  this.checkIfAvailableForRegistration  = [
    this._checkIfCityIsAvailableForRegistration.bind(this)
  ];

});

/**
 * The index page.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Home.prototype._useIndex = function(req, res) {
  res.render('index', {
    ip: this.getIp(req),
  });
};

Home.prototype._checkIfCityIsAvailableForRegistration = function(req, res) {

  CitiesEnt.getInstance().readOne({placeId: req.query.place_id})
    .bind(this)
    .then(function(result) {
      if (!result) {
        city = null;
      } else {
        city = result;
      }
      res.json({city:city});
    })
    .catch(function (err) {
      log.warn('_checkIfCityIsAvailableForRegistration() :: Error on fetching cities:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).json(null);
    });

};