const connect = require('connect');
const serveStatic = require('serve-static');

// create server
const connection = connect();
const serve = serveStatic(__dirname + '/web');

// serve files
connection.use(function serveLog(request, respond) {
  console.log('Serve: ' + request.url);
  return serve(request, respond);
});

// start server
connection.listen(8080, function() {
  console.log('Server is available on localhost:8080!');
  console.log();
});
