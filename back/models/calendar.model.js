/**
 * @fileOverview The Calendar Model.
 */

// var __ = require('lodash');
var BPromise = require('bluebird');
var mongoose = require('mongoose');
// var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.Calendar');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The Calendar model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var Calendar = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
Calendar.Schema = {
  title: {type: String, required: true, trim: true},
  venue: {type: String},
  address: {type: String},
  mapLink: {type: String},

  shortDescr: {type: String},
  longDescr: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  isFullDay: {type: Boolean},

  eventUrl: {type: String},
  hashtag: {type: String},
  isApproved: {type: Boolean}, // In case it's a member submission

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
Calendar.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing Calendar Model...');

  this.schema = new mongoose.Schema(Calendar.Schema);

  // define indexes
  this.schema.index({createdOn: 1});
  this.schema.index({startDate: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.CALENDAR, this.schema);
});
