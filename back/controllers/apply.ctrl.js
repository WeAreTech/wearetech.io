/**
 * @fileOverview GET /apply page.
 */
var validator = require('validator');
var log = require('logg').getLogger('app.ctrl.Register');
var ControllerBase = require('nodeon-base').ControllerBase;

var CityApplicationEntity = require('../entities/city-application.ent');

/**
 * Apply for cuty curation
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Apply = module.exports = ControllerBase.extendSingleton(function () {
  this.use.push(this._applyForCityCuration.bind(this));
});

Apply.prototype._applyForCityCuration = function (req, res) {

  var cityApplicationEntity = CityApplicationEntity.getInstance();

  // perform basic sanitizations, validation happens in model.
  var params = {
    firstName: validator.toWebstring(req.body.firstName, 40),
    lastName: validator.toWebstring(req.body.lastName, 40),
    companyName: validator.toWebstring(req.body.companyName, 60),
    email: validator.toWebstring(req.body.email, 120),
  };

  log.info('_useRegister() :: New user register:', params.email);

  var self = this;
  cityApplicationEntity.update({_id: req.body.cityApplicationId}, params)
    .then(function () {
      self.addFlashSuccess(req, {
        successMessage: 'You have been successfully apply for a city curator. ' +
                        'Wait till we approve your request and send your more info.'
      });
      res.redirect('/');
    })
    .catch(function (err) {
      log.warn('_applyForCityCuration() :: New application fail:', err.message);
      res.status(400).render('city/preview', {
        error: true,
        errorMessage: err.message,
        cityApplicationId: req.body.cityApplicationId,
      });
    });

};
