# mysql2-bluebird

Small promises wrapper for [`mysql2`](https://github.com/sidorares/node-mysql2),
it's forked from [`mysql2-promise`](https://github.com/namshi/node-mysql2-promise),
however it uses bluebird and adds additional apis while remaining compatible.

[![Build Status](https://travis-ci.org/jegsar/mysql2-bluebird.svg?branch=master)](https://travis-ci.org/jegsar/mysql2-bluebird)

## Installation

This module is installed via npm:

``` bash
$ npm install mysql2-bluebird --save
```

## Example Usage of query

``` js
var db = require('mysql2-bluebird')();

db.configure({
	"host": "localhost",
	"user": "foo",
	"password": "bar",
	"database": "db"
});

db.query('UPDATE foo SET key = ?', ['value']).then(function () {
	return db.query('SELECT * FROM foo');
}).spread(function (rows) {
	console.log('Look at all the foo', rows);
});

//using multiple databases, giving it a name 'second-db' so it can be retrieved inside other modules/files.
var db2 = require('mysql-bluebird')('second-db');

db2.configure({
	"host": "localhost",
	"user": "foo",
	"password": "bar",
	"database": "another-db"
});

db2.query('SELECT * FROM users').spread(function (users) {
	console.log('Hello users', users);
});


```

## Example Usage of execute

`execute()` function is similar to `query` but it use [prepared-statements](https://github.com/sidorares/node-mysql2#prepared-statements).

``` js
var db = require('mysql2-bluebird')();

db.configure({
	"host": "localhost",
	"user": "foo",
	"password": "bar",
	"database": "db"
});

db.execute('SELECT * FROM users WHERE LIMIT = ?', [10]).spread(function (users) {
	console.log('Hello users', users);
});

```

## Example usage of [namedPlaceholders]((https://github.com/sidorares/node-mysql2#named-placeholders))

``` js
var db = require('mysql2-bluebird')();

db.configure({
	"host": "localhost",
	"user": "foo",
	"password": "bar",
	"database": "db"
});

connection.pool.on('connection', function (poolConnection) {
    poolConnection.config.namedPlaceholders = true;
}

db.execute('SELECT * FROM users WHERE LIMIT = :limit', {limit: 10}).spread(function (users) {
	console.log('Hello users', users);
});

```

## Example usage of [format]((https://github.com/felixge/node-mysql#preparing-queries))

``` js
var db = require('mysql2-bluebird')();

var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = db.format(sql, inserts);

```

## Credits

This library is forked from [`mysql2-promise`](https://github.com/namshi/node-mysql2-promise)