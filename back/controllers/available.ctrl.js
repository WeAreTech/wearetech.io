/**
 * @fileOverview GET /available page.
 */

var ControllerBase = require('nodeon-base').ControllerBase;

/**
 * Check for city availability
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Available = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._checkIfCityIsAvailableForRegistration.bind(this));
});

Available.prototype._checkIfCityIsAvailableForRegistration = function(req, res) {

  res.render('city/available');

};
