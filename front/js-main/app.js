/**
 * @fileOverview Main App entry point
 */
var Available = require('./available');

/**
 * @Todo: better include method
 */
if (window.location.href.match(/available/)) {
  var available = new Available();
  available.init();
}
