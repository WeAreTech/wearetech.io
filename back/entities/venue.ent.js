/**
 * @fileOverview The Venue Entity.
 */

// var __ = require('lodash');
// var BPromise = require('bluebird');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;

// var log = require('logg').getLogger('app.ent.Venue');

var VenueModel = require('../models/venue.model');
var venueModel = VenueModel.getInstance();

/**
 * The Venue entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var Venue = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(venueModel.Model);
});

