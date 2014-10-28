/**
 * @fileOverview The City Entity.
 */

// var __ = require('lodash');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;

// var log = require('logg').getLogger('app.ent.City');

var CityModel = require('../models/city.model');
var cityModel = CityModel.getInstance();

/**
 * The City entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var City = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(cityModel.Model);

  this.method('register', this.create.bind(this));

});

City.STUB = 1;
