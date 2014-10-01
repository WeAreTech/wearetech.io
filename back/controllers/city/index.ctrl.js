/**
 * @fileOverview GET / City page.
 */

var log = require('logg').getLogger('app.ctrl.city.Index');
var ControllerBase = require('nodeon-base').ControllerBase;

var CommunitiesEnt = require('../../entities/communitity.ent');


/**
 * The City home page.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Home = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._fetchCommunities.bind(this));
  this.use.push(this._useIndex.bind(this));
});

/**
 * Will fetch all communities of the city.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function} next Pass control.
 * @private
 */
Home.prototype._fetchCommunities = function (req, res, next) {
  CommunitiesEnt.getInstance().read({cityOwner: req.city._id})
    .bind(this)
    .then(function(res) {
      if (!res) {
        res.locals.communities = [];
      } else {
        res.locals.communities = res;
      }
      next();
    })
    .catch(function (err) {
      log.warn('_fetchCommunities() :: Error on fetching communities:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).json(err);
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
