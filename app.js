var express = require('express');
var app = express();
var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var hostname = 'localhost';
var port = process.env.PORT || 3000;

var router = express.Router();

var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath: process.env.AWS_IOT_KEY_PATH,
	certPath: process.env.AWS_IOT_CERT_PATH,
	caPath: process.env.AWS_IOT_CA_PATH,
	clientId: process.env.AWS_IOT_CLIENT_ID,
	region: process.env.AWS_REGION,
	reconnectPeriod: 1500
});

