var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var QRCode = require('qrcode')
var crypto = require('crypto');

var Canvas = require('canvas'), Image = Canvas.Image, qrDecode = require('jsqrcode')(Canvas)

var app = express();
app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

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

    if (e.message.type == "image")
    {
      var image = new Image();

      image.onload = function(){
        var result;
        try{
          result = qrcode.decode(image);
        }catch(e){
          result = 'unable to read qr code';
        }

        console.log("result is "+result);
      }

      //オプションを定義
      var options = {
        url: 'https://api.line.me/v2/bot/message/'+e.message.id+'/content',
        proxy : process.env.FIXIE_URL,
        headers: headers,
      };
      
      request.post(options, function (error, response, body) {
        console.log("download");
        console.log(error);
        image.src = 'data:image/jpeg;base64,' + hexToBase64(body);
      });
    }
    else
    {
      var text = e.message.text;
      var hash = crypto.createHash('md5').update(text).digest('hex');
      var fileName = hash + ".png";
      var path = "/var/www/bot/"+fileName;
    
      if (fs.existsSync(path)) {
        // 送信データ作成
        var data = {
          "replyToken": e.replyToken,
          "messages": [
            {
              "type": 'image',
              "originalContentUrl": "https://chen-xiao.com/bot/"+fileName,
              "previewImageUrl": "https://chen-xiao.com/bot/"+fileName
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
      else
      {
        QRCode.save(path, text, [], function (error, written) {
          // 送信データ作成
          var data = {
            "replyToken": e.replyToken,
            "messages": [
              {
                "type": 'image',
                "originalContentUrl": "https://chen-xiao.com/bot/"+fileName,
                "previewImageUrl": "https://chen-xiao.com/bot/"+fileName
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
      }
    }
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
