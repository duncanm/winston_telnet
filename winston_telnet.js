var util = require('util'),
    net = require('net'),
  	winston = require('winston'), 
		sockets = [],
		server;

var TelnetLogger = winston.transports.TelnetLogger = function (options) {
  this.name = 'TelnetLogger';
  this.level = options.level || 'info';
	server = net.createServer(newSocket).listen(options.port);
};

util.inherits(TelnetLogger, winston.Transport);

TelnetLogger.prototype.log = function (level, msg, meta, callback) {
	for (var i = 0; i < sockets.length; i++) {
			sockets[i].write(msg + '\n');
	}

	callback(null, true);
	};


function closeSocket(socket) {
	var i = sockets.indexOf(socket);
	if (i != -1) {
		sockets.splice(i, 1);
	}
}


function newSocket(socket){
	sockets.push(socket);
	socket.write('Winston Telnet Server!\n');
	socket.on('end', function() {
		closeSocket(socket);
	})
};


	
	 
