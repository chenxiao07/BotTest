var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());     

app.get('/', function(req, res){
	res.send("It works");
});   

app.post('/qrchan', function(req, res){

  for(var e of req.body.events)
  {
  	var headers = {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization' : 'Bearer BHuL0QX6wYZCWCsuwHlQe4ouD7MR7FFnvAXAYDXwSrrvEtyLYLZnt1EGDN514jXlANtlnz3ILedOOIZumZYeC00M9qmHX2fKHyC6mspLmNn85wc02lh3mqmrveFB38NG6JK4BssfrO1iz9rqL24fgwdB04t89/1O/w1cDnyilFU='
    };
  
    // 送信データ作成
    var data = {
      "replyToken": e.replyToken,
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
  }
});

app.post('/worddic', function(req, res){

  for(var e of req.body.events)
  {
    var headers = {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization' : 'Bearer P5pLeFX5jRoU9l9NNGPDDbceTn92PiKdIb/rrB9U6ecfQKTT67W2q5GCnEgH66whzuxb3yzfbLdecax3sMtzWkBY9cYBmt+NvU7DfOJ19rEFI0Mz5vtGabhp0EanclclCgMvvZT9ydvHnYl0JDKvWwdB04t89/1O/w1cDnyilFU='
    };
  
    // 送信データ作成
    var data = {
      "replyToken": e.replyToken,
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
  }
});

app.listen(3030);
