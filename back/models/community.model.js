/**
 * @fileOverview The Community Model.
 */

// var __ = require('lodash');
var BPromise = require('bluebird');
var mongoose = require('mongoose');
// var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.Community');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The Community model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var Community = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
Community.Schema = {
  name: {type: String},
  website: {type: String},
  description: {type: String},
  maintainers: [{
    name: {type: String},
    email: {type: String},
    url: {type: String},
  }],

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
Community.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing Community Model...');

  this.schema = new mongoose.Schema(Community.Schema);

  // define indexes
  this.schema.index({createdOn: 1});
  this.schema.index({cityOwner: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.COMMUNITY, this.schema);
});
