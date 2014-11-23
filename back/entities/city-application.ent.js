/**
 * @fileOverview The City Applications Entity.
 */

var EntityBase = require('nodeon-base').EntityBase;
var CityApplicationModel = require('../models/city-application.model');
var cityApplicationModel = CityApplicationModel.getInstance();

/**
 * The City Applications entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var CityApplication = module.exports = EntityBase.extendSingleton(function () {
  this.setModel(cityApplicationModel.Model);

  this.method('register', this.create.bind(this));

});

CityApplication.STUB = 1;
