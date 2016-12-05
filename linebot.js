var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());        

app.post('/callback', function(req, res){
});

var sslOptions = {
  key: fs.readFileSync('ssl-cert/server.key'),
  cert: fs.readFileSync('ssl-cert/server.crt'),
  ca: fs.readFileSync('ssl-cert/ca.crt'),
  requestCert: true,
  rejectUnauthorized: false,
  passphrase: 'sxhctycgr-'
};

var secureServer = https.createServer(sslOptions, bot).listen('3030', function () {
  console.log("Secure server listening on port 3030");
});
