'use strict';

var db = require('../');
var chai = require('chai');
var expect = chai.expect;

describe('mysql2-bluebird', function() {
  it('returns correct instances', function() {
    var defaultDb = db();
    var namedDb = db('foo');
    expect(namedDb).equal(db('foo'));
    expect(namedDb).property('query').a.Function;
    expect(namedDb).property('execute').a.Function;
    expect(defaultDb).equal(db());
    expect(defaultDb).not.equal(namedDb);
    expect(defaultDb).property('query').a.Function;
    expect(defaultDb).property('execute').a.Function;
  });
  it('#format correctly formats sql', function() {
    var defaultDb = db();
    expect(defaultDb).property('format').a.Function;
    expect(defaultDb.format('SELECT * FROM users WHERE id = ?', 1)).eql('SELECT * FROM users WHERE id = 1');
  });
});
