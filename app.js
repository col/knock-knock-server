var express = require('express');
var app = express();
var path = require("path");
var server = require('http').createServer(app);
var passport = require('./auth');

var hostname = 'localhost';
var port = process.env.PORT || 3000;

var router = express.Router();

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath: process.env.AWS_IOT_KEY_PATH,
	certPath: process.env.AWS_IOT_CERT_PATH,
	caPath: process.env.AWS_IOT_CA_PATH,
	clientId: process.env.AWS_IOT_CLIENT_ID,
	region: process.env.AWS_REGION
});

device.on('connect', function(){
	console.log('mqtt connected');
	device.subscribe('door');
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: "knockknockawesome",
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

router.route('/open')
.post(passport.protected, function (request, response) {
	device.publish('door', JSON.stringify({
		event: 'open'
	}));

	console.log('{event: open} sent');
	response.sendStatus(200);
});

router.get('/login', function(request, response) {
  response.redirect(process.env.OKTA_SSO);
});

router.get('/login/error', function(request, response) {
  response.send("Login error");
});

router.get('/', passport.protected, function(request, response) {
  response.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/loginResult', function(request, response) {
  passport.authenticate('saml', {
        successRedirect: '/',
        failureRedirect: '/login/error',
        failureFlash: true
    })(request, response, function (error) {
        console.log(error.stack);
        response.status(500).send(error.message);
    });
});

app.use(express.static(path.join(__dirname + '/public')));
app.use(router);

server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});