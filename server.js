const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function(req, res) {
  addEmailToMailchimp(req.body.email)
  console.log(req.body.email);
  res.end('success!!!');
});

function addEmailToMailchimp(email){
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://us20.api.mailchimp.com/3.0/lists/344ef0edd0/members',
    headers:
     { 'Postman-Token': '499ef633-7c53-44db-a19a-cbb3ce3c465e',
       'Cache-Control': 'no-cache',
       Authorization: 'Basic YW55c3RyaW5nOjY2NDkzODhkYzNhMjhhNjljMGZjY2NiOTQwNjYyZjY3LXVzMjA=',
       'Content-Type': 'application/json' },
    body: { email_address: email, status: 'subscribed' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

}



// Middleware
//app.use(express.static(__dirname + '/public'));
//app.listen(3000, function(){
//  console.log("listen on ")
//});

//app.post('/', function(req, res) {
//  res.end('Success!!!');
//});
