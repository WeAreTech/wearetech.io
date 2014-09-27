/**
 * @fileOverview The Venue Model.
 */

// var __ = require('lodash');
var BPromise = require('bluebird');
var mongoose = require('mongoose');
// var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.Venue');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The Venue model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var Venue = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
Venue.Schema = {
  name: {type: String},
  address: {type: String},
  mapLink: {type: String},

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Collection.USER,
  },
  cityOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Collection.CITY,
  },

  createdOn: {type: Date, default: Date.now},
};

/**
 * Initialize the model.
 *
 * @return {BPromise} A promise
 */
Venue.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing Venue Model...');

  this.schema = new mongoose.Schema(Venue.Schema);

  // define indexes
  this.schema.index({createdOn: 1});
  this.schema.index({cityOwner: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.VENUE, this.schema);
});
