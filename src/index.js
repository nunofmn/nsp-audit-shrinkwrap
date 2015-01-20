var validateShrinkwrap = require('nsp-api').validateShrinkwrap;
var duplex = require('duplex');
var fs = require('fs');

exports = module.exports;

var audit = exports.audit = function(_shrinkwrap, cb) {
    var shrinkwrap = JSON.parse(_shrinkwrap);
    validateShrinkwrap(shrinkwrap, cb);
};

exports.auditByPath = function(shrinkwrapPath, cb) {
    fs.exists(shrinkwrapPath, function(exists) {
        if (!exists) {
            return cb(new Error('No file exists on: ' + shrinkwrapPath,
                    null));
        }
        var shrinkwrap = fs.readFileSync(shrinkwrapPath);
        audit(shrinkwrap, cb);
    });
};

exports.auditStream = function() {
    var shrinkwrapStream = duplex();
    var resultStream = duplex();

    shrinkwrapStream.on('_data', function(data) {
        audit(data, function(err, result) {
            resultStream.write(result);
        });
    });

    shrinkwrapStream.on('_end', function() {
        resultStream.end();
    });

    return {
        shrinkwrap: shrinkwrapStream,
        results: resultStream
    };
};
