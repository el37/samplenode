var express = require('express');
var app = express();
var fetch = require('node-fetch');

// app.listen(3000);
app.use(express.static('./public'));
app.use(express.static('node_modules/bootstrap/dist'));
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var datxa = [
	{
		"nama": "Eldo Greshard",
		"age": "40"
	},
	{
		"nama": "91leak",
		"age": "1000"
	}
]

app.get('/app-data', function(req, res){
	var options = {
		root: './public/'
	};
	res.sendFile('app-data.json', options);
});

io.on('connection', function(socket){
	socket.on('testing', function(){
		console.log('testing event');
	})

	socket.emit('dataJSON', datxa)
	setInterval(function(){
		fetch('http://localhost:3000/app-data')
			.then(response=>response.json())
			.then(result => {
				socket.emit('reply', result);
			})
	}, 100);
	
	console.log('connected %s', socket.id);
});
/*

var fetch = require('node-fetch');
var data = require('./app-datas');

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
*/
console.log('server run on localhost:3000');