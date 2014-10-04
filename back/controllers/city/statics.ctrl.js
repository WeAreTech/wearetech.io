/**
 * @fileOverview GET / City page.
 */

// var log = require('logg').getLogger('app.ctrl.city.Submit');
var ControllerBase = require('nodeon-base').ControllerBase;


/**
 * The Statics pages.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Statics = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._getSubmitEvent.bind(this));
});


/**
 * The submit-event page.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Statics.prototype._getSubmitEvent = function(req, res) {

  res.render('city/submit-event', {  });
};
