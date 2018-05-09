var request = require('auth-request');


var options = {
  scheme: 'http',
  hostname: '10.153.158.66',
  port: 8000,
  path: '/v1/eval',
  method: 'POST',
  headers: {
    'Accept': 'multipart/mixed',
    'Content-Type': 'application/x-www-form-urlencoded'
  }, 
  data: 'xquery=xquery version "1.0-ml"; let $uri := "hello" return $uri',
  username: 'sshachar',
  password: 'sshachar543'
};

request(options, function (err, res) {
  if (err) {
    console.log("error");
    console.log(err);
  }
  else{
    console.log("worked");
    console.log(res);
  }
});
