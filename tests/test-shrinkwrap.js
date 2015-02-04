var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var nspShrinkwrap = require('./../src/index.js');
var path = require('path');
var fs = require('fs');

var pVulPath = path.resolve(process.cwd() + '/tests/projectVulnerable') +
    '/npm-shrinkwrap.json';
var pVul = fs.readFileSync(pVulPath);

var pNotVulPath = path.resolve(process.cwd() + '/tests/projectNotVulnerable') +
    '/npm-shrinkwrap.json';
var pNotVul = fs.readFileSync(pNotVulPath);

experiment('shrinkwrap with no vulnerabilities', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    test('no vulnerabilities test', function(done) {
        nspShrinkwrap.audit(pNotVul, function(err, results) {
            expect(err).to.be.null();
            expect(results).to.deep.equal([]);
            done();
        });
    });

    test('no vulnerabilities by path test', function(done) {
        nspShrinkwrap.auditByPath(pNotVulPath, function(err, results) {
            expect(err).to.be.null();
            expect(results).to.deep.equal([]);
            done();
        });
    });

    test('no vulnerabilities bad path test', function(done) {
        nspShrinkwrap.auditByPath('awesome/path.json', function(err, results) {
            expect(err).to.exist();
            done();
        });
    });

});

experiment('shrinkwrap with vulnerabilities', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    test('vulnerabilities test', function(done) {
        nspShrinkwrap.audit(pVul, function(err, results) {
            expect(err).to.be.null();
            expect(results.length).to.equal(5);
            done();
        });
    });

    test('vulnerabilities by path test', function(done) {
        nspShrinkwrap.auditByPath(pVulPath, function(err, results) {
            expect(err).to.be.null();
            expect(results.length).to.equal(5);
            done();
        });
    });

});

experiment('shrinkwrap stream', function() {

    before(function(done) {
        done();
    });

    after(function(done) {
        done();
    });

    test('stream test', function(done) {
        var auditStream = nspShrinkwrap.auditStream();
        var results = [];
        auditStream.shrinkwrap.write(pNotVul);
        auditStream.shrinkwrap.write(pVul);

        setTimeout(function() {
            auditStream.shrinkwrap.end();
        }, 5000); // value depends on how responsive is the API

        auditStream.results.on('_data', function(data) {
            results.push(data);
        });

        auditStream.results.on('_end', function() {
            expect(results.length).to.equal(2);
            expect(results[0].length + results[1].length).to.equal(5);
            done();
        });

    });

});
