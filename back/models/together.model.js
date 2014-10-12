/**
 * @fileOverview The We Are Together Events model.
 */

var BPromise = require('bluebird');
var mongoose = require('mongoose');
// var appError = require('nodeon-error');
var log = require('logg').getLogger('app.model.Together');
var ModelMongo = require('nodeon-base').ModelMongoBase;

var Model = require('./model-base');

/**
 * The We Are Together Events model.
 *
 * @constructor
 * @extends {app.ModelMongo}
 */
var Together = module.exports = ModelMongo.extendSingleton();

/**
 * Define the schema
 * @type {Object}
 */
Together.Schema = {
  name: {type: String},
  dateStart: {type: Date},
  dateEnd: {type: Date},
  upcoming: {type: Boolean},
  venueName: {type: String},
  tagline: {type: String},
  mapLink: {type: String},
  hashtag: {type: String},
  whoWeAre: {type: String},

  // Schedule is an object with the time range as key and the event as value.
  // i.e. {'18:30 - 19:00': 'Warmup'}
  schedule: {type: Object},

  // Stacks is an Object with keys representing the sequence and values
  // the stack name.
  // i.e. {'1': 'Metal'}
  stacks: {type: Object},

  // Speakers is an Object with keys representing the stack and values
  // are an Array of Object with the following scheme:
  // i.e.
  // {'Metal': [{
  //    name: 'SKGTech',
  //    url: 'http://skgtech.io',
  //    description: lorem ipsum',
  // }]}
  speakers: {type: Object},

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
Together.prototype.init = BPromise.method(function() {
  log.fine('init() :: initializing Together Model...');

  this.schema = new mongoose.Schema(Together.Schema);

  // define indexes
  this.schema.index({createdOn: 1});
  this.schema.index({cityOwner: 1});
  this.schema.index({upcoming: 1});

  // initialize model
  this.Model = mongoose.model(Model.Collection.TOGETHER, this.schema);
});
