var test = require('tape');
var nspShrinkwrap = require('./../src/index.js');
var path = require('path');
var fs = require('fs');

var pVulPath = path.resolve(process.cwd() +
        '/tests/projectVulnerable') + '/npm-shrinkwrap.json';
var pVul = fs.readFileSync(pVulPath);

var pNotVulPath = path.resolve(process.cwd() +
        '/tests/projectNotVulnerable') + '/npm-shrinkwrap.json';
var pNotVul = fs.readFileSync(pNotVulPath);

test('shrinkwrap with no vulnerabilties test', function(t) {
    nspShrinkwrap.audit(pNotVul, function(err, results) {
        t.error(err, 'Should not return a error');
        t.same(results, [], 'Should not contain any vulnerabilities');
        t.end();
    });
});

test('shrinkwrap with vulnerabilties test', function(t) {
    nspShrinkwrap.audit(pVul, function(err, results) {
        t.error(err, 'Should not return a error');
        t.equal(results.length, 5, 'Should return 5 vulnerabilties');
        t.end();
    });
});

test('shrinkwrap path with no vulnerabilties test test', function(t) {
    nspShrinkwrap.auditByPath(pNotVulPath, function(err, results) {
        t.error(err, 'Should not return a error');
        t.same(results, [], 'Should not contain any vulnerabilities');
        t.end();
    });
});

test('shrinkwrap path with vulnerabilties test test', function(t) {
    nspShrinkwrap.auditByPath(pVulPath, function(err, results) {
        t.error(err, 'Should not return a error');
        t.equal(results.length, 5, 'Should return 5 vulnerabilties');
        t.end();
    });
});

test('shrinkwrap stream test', function(t) {
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
        t.equal(results.length, 2, 'Should have two results, ' +
            'one for each shrinkwrap');
        t.equal(results[0].length + results[1].length, 5, 'Sum of' +
            ' shrinkwrap vulns should be 5');
        t.end();
    });
});
