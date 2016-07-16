var express = require('express');
var cors = require('cors');
var app = express();
var path = require("path");
var server = require('http').createServer(app);

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

router.route('/open')
.post(function (request, response) {
	device.publish('door', JSON.stringify({
		event: 'open'
	}));

	console.log('{event: open} sent');
	response.sendStatus(200);
});

// router.use(function(request, response, next) {
//   if (request.path === '/login') { // pass requests for login page
//     next();
//   }
//   else 
//   {
// 	  if (! request.session || request.session.isLoggedIn !== true)
// 	    response.redirect('/login'); // redirect to login page when not logged in
// 	  else
// 	    next(); // else just pass the request along
//   }
// });

router.get('/login', function(request, response) {
  response.sendFile(path.join(__dirname + '/views/login.html'));
});

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use(cors({origin: 'thoughtworks.okta.com', credentials: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(router);

server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});