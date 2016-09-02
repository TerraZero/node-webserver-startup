const connect = require('connect');
const serveStatic = require('serve-static');

// create server
const connection = connect();
const serving = serveStatic(__dirname + '/web');

connection.use(function serveLog(request, respond, next) {
  console.log('Serve: ' + request.url);
  next();
});

// connection.use('/test', function dynamicServe(request, respond, next) {
//   console.log('|- Dynamic: ' + request.url);

//   respond.setHeader('Content-Type', 'text/plain');
//   respond.end('Dynamic root: ' + request.url);
// });

connection.use(function serve(request, respond, next) {
  console.log('|- Static: ' + request.url);

  try {
    serving(request, respond, next);
  } catch (e) {
    console.error('|- Error: ' + e);
  }
});

// start server
connection.listen(8080, function() {
  console.log();
  console.log('Server is available on: ');
  console.log('localhost:8080');
  console.log();
});
