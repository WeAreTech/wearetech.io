/**
 * @fileOverview The core express instance, requires all others.
 */
var config = require('config');
var cip = require('cip');
var BPromise = require('bluebird');
var express = require('express');
var vhost = require('vhost');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var webserver = require('../webserver.core');
var SocketServer = require('../websocketServer.core');
var socketServer = SocketServer.getInstance();
var globals = require('../globals');
var ExpressCity = require('./city.express');
var ExpressWebsite = require('./website.express');
var AuthMidd = require('../../middleware/auth.midd');

var log = require('logg').getLogger('app.core.express');

/**
 * The core express instance, requires all others.
 *
 * @constructor
 */
var ExpressApp = module.exports = cip.extendSingleton(function() {
  /** @type {express} The express instance */
  this.app = express();

  /** @type {?app.core.ExpressCity} The express API instance */
  this.expressCity = null;

  if (config.usevhosts) {
    this.expressCity = ExpressCity.getInstance();
  }

  this.expressWebsite = ExpressWebsite.getInstance();
});

/**
 * Kick off the webserver...
 *
 * @param {Object} opts Options as defined in app.init().
 * @return {BPromise} a promise.
 */
ExpressApp.prototype.init = BPromise.method(function(opts) {
  // initialize webserver
  webserver.init(this.app);

  var authMidd = new AuthMidd();

  var boot = [
    this.expressWebsite.init(opts),
    this.expressCity.init(opts),
  ];

  return BPromise.all(boot)
  .bind(this)
  .then(function (res) {
    log.fine('init() :: All express instances initialized, moving on with main');
    // body...
    var appApi = res[1];
    var appWebserver = res[0];

    // Discover proper port, Heroku exports it in an env
    var port;
    if (globals.isHeroku) {
      port = process.env.PORT;
    } else {
      port = config.webserver.port;
    }

    // Setup express
    this.app.set('port', port);
    // remove x-powered-by header
    this.app.set('x-powered-by', false);

    // Require Basic auth if on heroku
    if (globals.isHeroku) {
      this.app.use(authMidd.basicAuth);
    }

    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    // Init websockets
    socketServer.init(webserver.http);
    // listen for websocket connections
    socketServer.listen(globals.WebsocketNamespace.WEBSITE);

    if (config.usevhosts) {
      socketServer.listen(globals.WebsocketNamespace.API);
      this.app.use(vhost(config.hostname.city, appApi));
      // SKIN it for now..
      this.app.use(vhost('www.thesact.gr', appApi));
    }

    // ultimate fallback if no vhost triggers, use main web app
    this.app.use(appWebserver);

    // development only
    if (globals.isDev) {
      this.app.use(errorhandler());
    }

    return webserver.start(this.app);
  });
});
