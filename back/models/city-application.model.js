/**
 * @fileOverview The City Applications Model.
 */

var BPromise = require('bluebird');
var mongoose = require('mongoose');
var log = require('logg').getLogger('app.model.CityApplication');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The City Applications model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var CityApplication = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
CityApplication.Schema = {
  geo: {type: [Number], index: '2d'},
  canonical: {
    canonicalName: {type: String},
    countryCode: {type: String}
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Model.Collection.USER,
  },
  createdOn: {type: Date, default: Date.now},
};

/**
 * Initialize the model.
 *
 * @return {BPromise} A promise
 */
CityApplication.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing City Application Model...');

  this.schema = new mongoose.Schema(CityApplication.Schema);

  // define indexes
  this.schema.index({createdOn: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.CITYAPPLICATION, this.schema);
});
