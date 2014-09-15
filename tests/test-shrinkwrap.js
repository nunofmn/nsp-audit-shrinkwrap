var test = require('tape');


///

test('shrinkwrap with no vulnerabilties test', function (t) {
  t.end();
});

test('shrinkwrap with vulnerabilties test', function (t) {
  t.end();
});


///

test('shrinkwrap path with no vulnerabilties test test', function (t) {
  t.end();
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