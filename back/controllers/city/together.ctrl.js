/**
 * @fileOverview GET /together page.
 */

var log = require('logg').getLogger('app.ctrl.city.Together');
var ControllerBase = require('nodeon-base').ControllerBase;

var TogetherEnt = require('../../entities/together.ent');


/**
 * The Together events page.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Home = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._fetchEvent.bind(this));
  this.use.push(this._showTogether.bind(this));
});

/**
 * Will check if exists and fetch the Together event record.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function} next Pass control.
 * @private
 */
Home.prototype._fetchEvent = function (req, res, next) {
  TogetherEnt.getInstance().readOne({
    cityOwner: req.city._id,
    upcoming: true,
  })
    .bind(this)
    .then(function(result) {
      if (!result) {
        res.locals.communities = [];
      } else {
        res.locals.communities = result;
      }
      next();
    })
    .catch(function (err) {
      log.warn('_fetchCommunities() :: Error on fetching communities:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).render('city/error/500', {error: err});
    });
};

/**
 * The index page.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Home.prototype._useIndex = function(req, res) {

  res.render('city/index', {
    og: null, // title, site_name, url, description, image, appId, type
    pageTitle: null,
    ga: null, // GA id
    gaSite: null, // Canonical GA website name
  });
};
