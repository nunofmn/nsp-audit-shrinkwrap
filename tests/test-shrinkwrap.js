var test = require('tape');
var nsp_shrinkwrap = require('./../index.js');
var path = require('path');
var fs   = require('fs');

// var pVulPath    = path.resolve(process.cwd() + '/tests/projectVulnerable') + '/npm-shrinkwrap.json';
// var pVul        = fs.readFileSync(pVulPath);

var pNotVulPath = path.resolve(process.cwd() + '/tests/projectNotVulnerable') + '/npm-shrinkwrap.json';
var pNotVul     = fs.readFileSync(pNotVulPath);

///

test('shrinkwrap with no vulnerabilties test', function (t) {
  nsp_shrinkwrap.audit(pNotVul, function (err, results){
    t.error(err, 'Should not return a error');
    t.same(results, [],  'Should not contain any vulnerabilities');
    t.end();
  });
});

test('shrinkwrap with vulnerabilties test', function (t) {
  t.end();
});


///

test('shrinkwrap path with no vulnerabilties test test', function (t) {
  nsp_shrinkwrap.auditByPath(pNotVulPath, function (err, results){
    t.error(err, 'Should not return a error');
    t.same(results, [],  'Should not contain any vulnerabilities');
    t.end();
  });
});

test('shrinkwrap path with vulnerabilties test test', function (t) {
  t.end();
});


///

test('shrinkwrap stream test', function (t) {
  t.end();  
});


// t.plan(2);

// t.equal(typeof Date.now, 'function');
// var start = Date.now();

// t.end()


// vulnerabilties picked:
// qs       https://nodesecurity.io/advisories/qs_dos_extended_event_loop_blocking
// crumb    https://nodesecurity.io/advisories/crumb_cors_token_disclosure
// connect  https://nodesecurity.io/advisories/methodOverride_Middleware_Reflected_Cross-Site_Scripting
// send     https://nodesecurity.io/advisories/send-directory-traversal