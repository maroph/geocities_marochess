var express = require('express');

var app = express();
app.configure(function () {
    app.use(
        '/',
        express.static(__dirname + '/app')
    );
});

// The web application listen on the following port:
var PORT = 2014;
app.listen(PORT);

console.log('--------------------------------------------------------------------------------------------\n' +
			'| The root folder is: ' + __dirname + '/app\n' +
			'| You can access the application at: http://localhost:' + PORT + '\n' +
			'--------------------------------------------------------------------------------------------\n');