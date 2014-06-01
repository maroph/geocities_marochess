var express = require('express');

var app = express();
app.use(
    '/',
    express.static(__dirname + '/app')
);

app.listen(2014);

console.log('--------------------------------------------------------------------------------------------\n' +
			'| The root folder is: ' + __dirname + '/app\n' +
			'| You can access the application at: http://localhost:2014\n' +
			'--------------------------------------------------------------------------------------------\n');