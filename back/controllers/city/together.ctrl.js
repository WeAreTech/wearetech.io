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
  this.use.push(this._populateOgTags.bind(this));
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
        this.show404();
      } else {
        res.locals.together = result;
        next();
      }
    })
    .catch(function (err) {
      log.warn('_fetchEvent() :: Error on fetching together event:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).render('city/error/500', {error: err});
    });
};

Home.prototype._populateOgTags = function(req, res, next) {
  if (!res.locals.city || !res.locals.city.og) {
    next();
    return;
  }
  var origUrl = req.city.og.url;
  res.locals.city.og.url += '/together';
  res.locals.city.og.image = 'http://' + origUrl + '/img/we-are-together-logo.png';
  res.locals.city.og.description = res.locals.together.tagline;
  next();
};

/**
 * The Together view.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Home.prototype._showTogether = function(req, res) {

  res.render('city/together', {
    og: null, // title, site_name, url, description, image, appId, type
    pageTitle: null,
    ga: null, // GA id
    gaSite: null, // Canonical GA website name
  });
};
