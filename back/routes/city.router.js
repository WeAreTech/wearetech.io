/**
 * @fileOverview Routes for City.
 */
var log = require('logg').getLogger('app.router.city');

var HomeCtrl = require('../controllers/city/index.ctrl');
var StaticsCtrl = require('../controllers/city/statics.ctrl');
var TogetherCtrl = require('../controllers/city/together.ctrl');

var router = module.exports = {};

/**
 * Initialize routes.
 *
 * @param {express} app Express instance.
 */
router.init = function(app) {
  log.fine('init() :: initializing routes...');
  var homeCtrl = HomeCtrl.getInstance();
  var staticsCtrl = StaticsCtrl.getInstance();
  var togetherCtrl = TogetherCtrl.getInstance();

  app.get('/', homeCtrl.use);

  app.get('/submit-event', staticsCtrl.use);

  app.get('/together', togetherCtrl.use);
  app.get('/hackerspace', function (req, res) {
    res.render('static/hs');
  });
};
