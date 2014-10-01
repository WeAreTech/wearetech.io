/**
 * @fileOverview The Community Entity.
 */

// var __ = require('lodash');
// var BPromise = require('bluebird');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;

// var log = require('logg').getLogger('app.ent.Community');

var CommunityModel = require('../models/community.model');
var communityModel = CommunityModel.getInstance();

/**
 * The Community entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var Community = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(communityModel.Model);
});

Community.STUB = 1;
