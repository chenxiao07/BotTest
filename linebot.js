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

app.post('/callback', function(req, res){

  for(var e of req.body.events)
  {
  	var headers = {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization' : 'Bearer P5pLeFX5jRoU9l9NNGPDDbceTn92PiKdIb/rrB9U6ecfQKTT67W2q5GCnEgH66whzuxb3yzfbLdecax3sMtzWkBY9cYBmt+NvU7DfOJ19rEFI0Mz5vtGabhp0EanclclCgMvvZT9ydvHnYl0JDKvWwdB04t89/1O/w1cDnyilFU='
    };
  
    // 送信データ作成
    var data = {
      "replyToken": e.replyToken,
      "messages":[
              {
                "type": "template",
                "altText": "おすすめレストラン",
                "template": {
                    "type": "carousel",
                    "columns": [

                        {
                          "thumbnailImageUrl": "https://s3-us-west-2.amazonaws.com/lineapitest/hamburger_240.jpeg",
                          "title": "ジャンク・バーガー",
                          "text": "誰が何と言おうとジャンクフードの王様は、今も昔も変わらずハンバーガー。",
                          "actions": [

                              {
                                  "type": "uri",
                                  "label": "詳細を見る",
                                  "uri": "http://example.com/page/222"
                              }
                          ]
                        },
                        {
                          "thumbnailImageUrl": "https://s3-us-west-2.amazonaws.com/lineapitest/pizza_240.jpeg",
                          "title": "pizza cap",
                          "text": "本場ナポリの味を早く、安く。都内に17店舗展開するピザ専門店です。",
                          "actions": [

                              {
                                  "type": "uri",
                                  "label": "詳細を見る",
                                  "uri": "http://example.com/page/222"
                              }
                          ]
                        },
                        {
                          "thumbnailImageUrl": "https://s3-us-west-2.amazonaws.com/lineapitest/bread_240.jpeg",
                          "title": "本格パン工房 たけよし",
                          "text": "パンにとって一番大事だと思うものはなんですか？たけよしは、表面の焼き上がりこそが命であると考えています。",
                          "actions": [

                              {
                                  "type": "uri",
                                  "label": "詳細を見る",
                                  "uri": "http://example.com/page/222"
                              }
                          ]
                        },
                        {
                          "thumbnailImageUrl": "https://s3-us-west-2.amazonaws.com/lineapitest/harumaki_240.jpeg",
                          "title": "ヴェトナムTokyo",
                          "text": "東池袋にあるしたベトナム料理の老舗。40年以上人々に愛され続けてきたベトナム料理をご提供します。",
                          "actions": [

                              {
                                  "type": "uri",
                                  "label": "詳細を見る",
                                  "uri": "http://example.com/page/222"
                              }
                          ]
                        },

                    ]
                }
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
