var express = require('express');

var app = express();
app.configure(function () {
    app.use(
        '/',
        express.static(__dirname + '/app')
    );
});

app.listen(2013);

console.log('--------------------------------------------------------------------------------------------\n' +
			'| The root folder is: ' + __dirname + '/app\n' +
			'| You can access the application at: http://localhost:2013\n' +
			'--------------------------------------------------------------------------------------------\n');