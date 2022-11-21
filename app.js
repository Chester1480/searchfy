var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

const cors = require('cors');

const WebSocketServer = require('ws');

const wss = new WebSocketServer.Server({ port: 3001 });

wss.on("connection", ws => {
  console.log("new client connected");
  // sending message
  ws.on("message", data => {
      console.log(`Client has sent us: ${data}`)
  });
  // handling what to do when clients disconnects from server
  ws.on("close", () => {
      console.log("the client has connected");
  });
  // handling client connection error
  ws.onerror = function () {
      console.log("Some Error occurred")
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', require('./routes/index'));
app.use('/spotify/', require('./routes/spotify'));


app.use(cors({
  origin: ['https://*.spotify.com/']
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

module.exports = app;
