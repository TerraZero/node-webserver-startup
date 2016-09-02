const connect = require('connect');
const serveStatic = require('serve-static');

// create server
const connection = connect();
const serve = serveStatic(__dirname + '/web');

// serve files
connection.use(function useServe(request, respond, next) {
  console.log('Serve: ' + request.url);

  // serve dynamic paths
  // if (request.url.startsWith('/test')) {
  //   respond.setHeader('Content-Type', 'text/plain');
  //   respond.end('Hello Connect');
  //   return;
  // }

  try {
    serve(request, respond, next);
  } catch (e) {
    console.error(e);
  }
});

// start server
connection.listen(8080, function() {
  console.log();
  console.log('Server is available on: ');
  console.log('localhost:8080');
  console.log();
});
