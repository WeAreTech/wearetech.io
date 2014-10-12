/**
 * @fileOverview Populate db with required records
 */
var path = require('path');

var Promise = require('bluebird');
var cip = require('cip');
var file = require('nodeon-file');
var config = require('config');
var log = require('logg').getLogger('app.scripts.Initdb');

var UserEntity = require('../entities/user/user.ent');
var CityEntity = require('../entities/city.ent');
var CommunityEntity = require('../entities/community.ent');
var TogetherEntity = require('../entities/together.ent');

var Initdb = module.exports = cip.extend(function () {
  this.userEnt = null;
  this.cityEnt = null;
  this.communityEnt = null;
  this.togetherEnt = null;

  /** @type {?Array.<Object>} Cities to populate. */
  this.cities = null;

  /** @type {mongoose.Document} Created cities */
  this.citySkg = null;
  this.cityAth = null;

  /** @type {?Object} Communities to populate */
  this.communities = null;

  /** @type {?Object} Together events to populate */
  this.togetherEvents = null;

  /** @type {?mongoose.Document} Admin user UDO */
  this.adminUdo = null;
});

/**
 * Start DB population, will not overwrite existing records.
 *
 * @return {Promise} A Promise.
 */
Initdb.prototype.start = Promise.method(function() {
  log.fine('start() :: Starting DB Population...');

  this.userEnt = UserEntity.getInstance();
  this.cityEnt = CityEntity.getInstance();
  this.communityEnt = CommunityEntity.getInstance();
  this.togetherEnt = TogetherEntity.getInstance();

  return this._readDataFiles()
    .bind(this)
    .then(this.nukeDb)
    .then(this._createAdminUser)
    .then(this._createCities)
    .then(this._createTogether)
    .then(this._createCommunities);
});

/**
 * Read data files to create records for.
 *
 * @return {Promise} A Promise.
 */
Initdb.prototype._readDataFiles = Promise.method(function() {
  return Promise.all([
    file.readYaml(path.join(__dirname, '../datafiles', 'together.yaml')),
    file.readYaml(path.join(__dirname, '../datafiles', 'communities.yaml')),
  ])
    .bind(this)
    .spread(function (togetherEvents, communities) {
      this.cities = config.data.city;
      this.communities = communities;
      this.togetherEvents = togetherEvents;
    });
});

/**
 * Nukes the contents of the database.
 *
 * @return {Promise} A promise.
 */
Initdb.prototype.nukeDb = Promise.method(function() {
  log.finer('nukeDb() :: Nuking the db records...');
  return Promise.all([
    this.userEnt.delete({}),
    this.cityEnt.delete({}),
    this.communityEnt.delete({}),
    this.togetherEnt.delete({}),
  ]);
});

/**
 * Creates the admin user
 *
 * @return {Promise}
 * @private
 */
Initdb.prototype._createAdminUser = Promise.method(function() {
  log.finer('_createAdminUser() :: Creating Admin user...');
  var adminUdo = {
    email: 'bofh@awesomeapp.com',
    firstName: 'Admin',
    lastName: 'User',
    password: 'asdfgh',
    role: UserEntity.Role.ADMIN,
  };
  return this.userEnt.create(adminUdo)
    .bind(this)
    .then(function (udo) {
      this.adminUdo = udo;
    });
});

/**
 * Create stub cities.
 *
 * @return {Promise} A Promise.
 */
Initdb.prototype._createCities = Promise.method(function () {
  log.finer('_createCities() :: Creating cities...');

  return Promise.resolve(this.cities)
    .bind(this)
    .map(function(cityObj) {
      cityObj.createdBy = this.adminUdo._id;
      return this.cityEnt.create(cityObj);
    })
    .spread(function (skg, ath) {
      this.citySkg = skg;
      this.cityAth = ath;
    });
});

/**
 * Create the together events.
 *
 * @return {Promise} A promise.
 */
Initdb.prototype._createTogether = Promise.method(function () {
  log.finer('_createTogether() :: Creating Together events...');

  return Promise.resolve(this.togetherEvents.skg)
    .bind(this)
    .map(function (togetherEvent) {
      togetherEvent.cityOwner = this.citySkg._id;
      togetherEvent.createdBy = this.adminUdo._id;
      return this.togetherEnt.create(togetherEvent);
    });
});

/**
 * Create community records.
 *
 * @return {Promise} A Promise.
 */
Initdb.prototype._createCommunities = Promise.method(function () {
  log.finer('_createCommunities() :: Creating communities...');

  return Promise.all([
    Promise.resolve(this.communities.skg)
      .map(this._createCommunity.bind(this, this.citySkg)),
    Promise.resolve(this.communities.ath)
      .map(this._createCommunity.bind(this, this.cityAth)),
  ]);
});

/**
 * Create a single community item.
 *
 * @param {mongoose.Document} cityItem The city item.
 * @param {Object} communityObj The community data to create.
 * @return {Promise(mongoose.Document)} A Promise.
 */
Initdb.prototype._createCommunity = Promise.method(function(cityItem, communityObj) {
  communityObj.cityOwner = cityItem._id;
  communityObj.createdBy = this.adminUdo._id;

  return this.communityEnt.create(communityObj);
});
