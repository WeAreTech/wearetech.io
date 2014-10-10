/**
 * @fileOverview Main App entry point
 */
var Available = require('./Available');

/**
 * @Todo: better include method
 */
if (window.location.href.match(/available/)) {
  var available = new Available();
  available.init();
}
