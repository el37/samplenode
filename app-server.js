var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var fetch = require('node-fetch');

var data = require('./app-datas');
app.use(express.static('node_modules/bootstrap/dist'));

/*
app.get('/', function(req, res){
	var options = {
		root: './public/'
	};
	res.sendFile('index.html',{ root: './public/' });
});

app.get('/app-data', function(req, res){
	var options = {
		root: './public/'
	};
	res.sendFile('app-data.json', options);
});
*/
io.on('connection', function(socket){
	socket.on('testing', function(){
		console.log('testing event');
	})

	setInterval(function(){
		fetch('http://localhost:3000/app-data')
			.then(response=>response.json())
			.then(result => {
				socket.emit('reply', result);	
			})
	}, 36000);

	console.log('connected %s', socket.id);
});

console.log('server run on localhost:3000');