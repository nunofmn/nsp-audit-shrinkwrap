var validateShrinkwrap = require('nsp-api').validateShrinkwrap;
var duplex = require('duplex');
var fs = require('fs');

exports = module.exports;

var auditShrinkwrap = exports.auditShrinkwrap = function (_shrinkwrap, cb) {
  var shrinkwrap = JSON.parse(_shrinkwrap);

  validateShrinkwrap(shrinkwrap, function (err, result) {
    if (err) { return cb(err, null); }
    cb(null, result);
  });
};

exports.auditShrinkwrapByPath = function (shrinkwrapPath, cb) {
  fs.exists(shrinkwrapPath, function (exists) {
    if (!exists) {
        return cb(new Error('No file exists on: ' + shrinkwrapPath , null));
    }
    var shrinkwrap = fs.readFileSync(shrinkwrapPath);
    auditShrinkwrap(shrinkwrap, cb);
  });
};

exports.auditShrinkwrapStream = function () {
  var shrinkwrapStream = duplex();
  var resultStream = duplex();

  shrinkwrapStream.on('_data', function (data) {
    auditShrinkwrap(data, function (err, result) {
      resultStream.sendData(result);
    });
  });

  shrinkwrapStream.on('_end', function () {
    resultStream.sendEnd();
  });

  return {
    shrinkwrap: shrinkwrapStream,
    results: resultStream
  };
};
