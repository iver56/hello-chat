var http = require('http'),
  sockjs = require('sockjs'),
  helloChat = sockjs.createServer(),
  connections = [];

helloChat.on('connection', function(connection) {
  console.log('connection');
  connections.push(connection);

  connection.on('data', function(message) {
    console.log('got data: ' + message);
    for(var i = 0; i < connections.length; i++) {
      connections[i].write(message);
    }
  });

  connection.on('close', function() {
    connections.splice(connections.indexOf(connection), 1); //remove the collection
    console.log('Lost connection');
  });
});

var server = http.createServer();
helloChat.installHandlers(server, {prefix: '/helloChat'});
server.listen(5555, '0.0.0.0');
