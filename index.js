const connect = require('connect');
const serveStatic = require('serve-static');

// create server
const connection = connect();
const serving = serveStatic(__dirname + '/web', {fallthrough: false});

function redirect(response, location) {
  console.log('|- Redirect: ' + location);
  response.writeHead(302, {
    'Location': location,
  });
  response.end();
}

connection.use(function serveLog(request, response, next) {
  console.log('Serve: ' + request.url);
  next();
});

// connection.use('/test', function dynamicServe(request, response, next) {
//   console.log('|- Dynamic: ' + request.url);

//   response.setHeader('Content-Type', 'text/plain');
//   response.end('Dynamic root: ' + request.url);
// });

connection.use(function serve(request, response, next) {
  console.log('|- Static: ' + request.url);
  serving(request, response, next);
});

connection.use(function notFoundHandler(err, request, response, next) {
  if (err.statusCode == 404) {
    redirect(response, '/error/404.html');
  } else {
    console.error('|- Error (' + err.statusCode + '): ' + err);
  }
});

// start server
connection.listen(8080, function() {
  console.log();
  console.log('Server is available on: ');
  console.log('localhost:8080');
  console.log();
});
