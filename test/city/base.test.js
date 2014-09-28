/**
 * @fileOverview Base city hostname tests.
 */
var chai = require('chai');
var expect = chai.expect;

var tester = require('../lib/tester.lib');
var Web = require('../lib/web.lib');

describe.only('City Base Tests', function() {
  tester.init();

  beforeEach(function() {
    var web = new Web('http://skg.localhost:3000');
    this.req = web.req;
  });

  it('Will get a 200 on the website frontpage', function(done) {
    this.req.get('/')
      .expect(200, done);
  });
  it('Will not contain the "x-powered-by" header on website"', function(done) {
    this.req.get('/')
      .end(function(err, req) {
        expect(req.header).to.not.have.property('x-powered-by');
        done();
      });
  });
  it('Will get a 404 if the city does not exist', function(done) {
    var web = new Web('http://missing.localhost:3000');
    web.req.get('/')
      .expect(404)
      .expect(/Wrong Turn/, done);
  });


});
