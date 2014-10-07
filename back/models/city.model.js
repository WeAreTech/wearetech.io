/**
 * @fileOverview The City Model.
 */

// var __ = require('lodash');
var BPromise = require('bluebird');
var mongoose = require('mongoose');
// var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.City');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The City model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var City = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
City.Schema = {
  name: {type: String, required: true, trim: true},
  hostname: {type: String, required: true, trim: true},
  domainName: {type: String, required: true, trim: true},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Collection.USER,
  },
  twitter: {type: String},
  facebook: {type: String},
  calendarUrl: {type: String},
  forumUrl: {type: String},
  og: {
    title: {type: String},
    siteName: {type: String},
    url: {type: String},
    description: {type: String},
    image: {type: String},
    appId: {type: String},
    type: {type: String},
  },
  ga: {type: String},

  createdOn: {type: Date, default: Date.now},
};

/**
 * Initialize the model.
 *
 * @return {BPromise} A promise
 */
City.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing City Model...');

  this.schema = new mongoose.Schema(City.Schema);

  // define indexes
  this.schema.index({name: 1});
  this.schema.index({hostname: 1}, {unique: true});
  this.schema.index({createdOn: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.CITY, this.schema);
});
