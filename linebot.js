var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());        

app.post('/callback', function(req, res){

  var headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'Authorization' : 'Bearer P5pLeFX5jRoU9l9NNGPDDbceTn92PiKdIb/rrB9U6ecfQKTT67W2q5GCnEgH66whzuxb3yzfbLdecax3sMtzWkBY9cYBmt+NvU7DfOJ19rEFI0Mz5vtGabhp0EanclclCgMvvZT9ydvHnYl0JDKvWwdB04t89/1O/w1cDnyilFU='
  };

  // 送信データ作成
  var data = {
    "replyToken": req.body.events[0].replyToken,
    "messages": [
      {
        "type": 'text',
        "text": 'Hello world',
      }
    ]
  };

  //オプションを定義
  var options = {
    url: 'https://api.line.me/v2/bot/message/reply',
    proxy : process.env.FIXIE_URL,
    headers: headers,
    json: true,
    body: data
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log('error: '+ JSON.stringify(response));
    }
  });
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
