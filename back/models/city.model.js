/**
 * @fileOverview The City Model.
 */

var __ = require('lodash');
var BPromise = require('bluebird');
var config = require('config');
var mongoose = require('mongoose');
var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.User');
var helpers = require('nodeon-helpers');
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
