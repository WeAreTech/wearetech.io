/**
 * @fileOverview Frontpage tests.
 */
// var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var tester = require('../lib/tester.lib');
var Web = require('../lib/web.lib');

describe('Frontpage', function() {
  tester.init();
  Web.setup();

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
  it('Can access the site from 127.0.0.1', function(done) {
    var web = new Web('127.0.0.1:3000');
    this.req = web.req;
    this.req.get('/')
      .expect(200, done);
  });
});
