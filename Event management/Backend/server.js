const express = require('express'),
app = express(),
mysql = require('mysql'), // import mysql module
cors = require('cors'),
bodyParser = require('body-parser');
//app.use(session({
//  secret: 'secret',
//  resave: true,
//  saveUninitialized: true
//}));
//app.use(bodyParser.urlencoded({extended : true}));


// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eventdb'
})

// make server object that contain port property and the value for our server.
var server = {
  port: 3001
};

// routers
const usersRouter = require('./routes/users');
const eventRouter = require('./routes/event');
const bookingRouter = require('./routes/booking');

// use the modules
app.use(cors())
app.use(bodyParser.json());

// use router
app.use('/users', usersRouter);
app.use('/event', eventRouter);
app.use('/booking', bookingRouter)

// respond with "Welcome to 3001" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Welcome to 3001')
  })
// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));