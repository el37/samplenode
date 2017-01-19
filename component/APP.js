var React = require('react');
var io = require('socket.io-client');

var APP = React.createClass({

	componentWillMount(){
		this.socket = io('http://localhost:3000');
	},
	render() {
		return(
			<h1>Hello World</h1>
		);
	}
});

module.exports = APP;