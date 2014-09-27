/**
 * @fileOverview GET / City page.
 */
// var log = require('logg').getLogger('app.ctrl.city.Index');

var ControllerBase = require('nodeon-base').ControllerBase;

/**
 * The City home page.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Home = module.exports = ControllerBase.extendSingleton(function(){
  this.use.push(this._useIndex.bind(this));
});

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
