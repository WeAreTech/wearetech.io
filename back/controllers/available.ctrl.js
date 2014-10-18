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
  this.use.push(this._registerNewCity.bind(this));
});

Available.prototype._registerNewCity = function(req, res) {
  if (req.method === 'GET') {
    this._getAvailableView(req, res);
    return;
  }

  res.render('city/available');

};

Available.prototype._getAvailableView = function(req, res) {

  res.render('city/available');

};
