nsp-audit-shrinkwrap
====================

`nsp-audit-shrinkwrap` offers a simple library to audit your shrinkwrap or a stream of shrinkwraps.

## Badgers

[![NPM](https://nodei.co/npm/nsp-audit-shrinkwrap.png?downloads=true&stars=true)](https://nodei.co/npm/nsp-audit-shrinkwrap/)

[![Dependency Status](https://david-dm.org/nodesecurity/nsp-audit-shrinkwrap.svg)](https://david-dm.org/nodesecurity/nsp-audit-shrinkwrap)[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/nodesecurity/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Single npm-shrinkwrap.json

```javascript
var nspShrinkwrap  = require('nsp-audit-shrinkwrap');
var shrinkwrapPath = '/path/to/npm-shrinkwrap.json'
var shrinkwrapFile = fs.readFileSync(shrinkwrapPath);


nspShrinkwrap.audit(shrinkwrapFile, function (err, results){
    console.log(results);
};

nspShrinkwrap.auditByPath(shrinkwrapPath, function (err, results){
    console.log(results);
};
```

## Stream of npm-shrinkwrap.json

```javascript
var auditStream = nspShrinkwrap.auditStream();
var results = [];

auditStream.shrinkwrap.write(shrinkwrap1);
auditStream.shrinkwrap.write(shrinkwrap2);
//... how many shrinkwraps you want

setTimeout(function(){
    auditStream.shrinkwrap.end(); // you close the stream whenever you want :)
}, 3000);

auditStream.results.on('_data', function (data){
    results.push(data);
});

auditStream.results.on('_end', function (){
    console.log(results);
});
```
