/**
 * @fileOverview The Calendar Entity.
 */

// var __ = require('lodash');
// var BPromise = require('bluebird');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;

// var log = require('logg').getLogger('app.ent.Calendar');

var CalendarModel = require('../../models/calendar.model');
var calendarModel = CalendarModel.getInstance();

/**
 * The Calendar entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var Calendar = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(calendarModel.Model);
});

Calendar.STUB = 1;
