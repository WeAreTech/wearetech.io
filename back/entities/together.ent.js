/**
 * @fileOverview The Together Entity.
 */

// var __ = require('lodash');
// var BPromise = require('bluebird');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;

// var log = require('logg').getLogger('app.ent.Together');

var TogetherModel = require('../models/together.model');
var togetherModel = TogetherModel.getInstance();

/**
 * The Together entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var Together = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(togetherModel.Model);
});

Together.STUB = 1;
