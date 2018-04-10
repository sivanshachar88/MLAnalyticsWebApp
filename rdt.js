var digestRequest = require('request-digest')('admin', 'admin');

//https://github.com/bnjjj/node-request-digest

//GET REQUEST
/*
digestRequest.requestAsync({
  host: 'http://localhost',
  path: '/v1/documents?uri=books.xml&format=xml',
  port: 8011,
  method: 'GET',
  headers: {
  }
})
.then(function (response) {
  console.log('into response');
  console.log(response.body);
})
.catch(function (error) {
  console.log(error.statusCode);
  console.log(error.body);
});
*/

//POST REQUEST
/*
var bodyXML =     
    '<s:query xmlns:s="http://marklogic.com/appservices/search"> \
      <s:value-query> \
        <s:element name="level" ns=""/> \
        <s:text>123</s:text> \
      </s:value-query> \
    </s:query>';


digestRequest.requestAsync({
  host: 'http://localhost',
  path: '/v1/search',
  port: 8011,
  method: 'POST',
  json: false,
  body: bodyXML,
  headers: {
        'Content-Type': 'application/xml'
  }
})
.then(function (response) {
  console.log('response:');
  console.log(response.body);
})
.catch(function (error) {
  console.log('error');
  console.log(error);
});
*/
var stateQuery = 
`xquery version "1.0-ml";

declare namespace p="http://persistence.ffe.cms.hhs.gov";
declare namespace base="http://base.persistence.base.cms.hhs.gov";
declare namespace pb = "http://persistence.base.cms.hhs.gov";

let $_ := xdmp:set-request-time-limit(60)

let $states := (
"AL",
"AK",
"AZ",
"AR",
"CA",
"CO",
"CT",
"DE",
"FL",
"GA",
"HI",
"ID",
"IL",
"IN",
"IA",
"KS",
"KY",
"LA",
"ME",
"MD",
"MA",
"MI",
"MN",
"MS",
"MO",
"MT",
"NE",
"NV",
"NH",
"NJ",
"NM",
"NY",
"NC",
"ND",
"OH",
"OK",
"OR",
"PA",
"RI",
"SC",
"SD",
"TN",
"TX",
"UT",
"VT",
"VA",
"WA",
"WV",
"WI",
"WY")

for $state in $states
  let $uri := fn:concat("/", $state, "/gov/ffe/InsuranceApplication/")
  return fn:concat($state, ":", fn:count(xdmp:directory($uri, "1")))`;

var query = 'xquery=' + stateQuery;

function submitRequest(queryName, bodyXML) {

	digestRequest.requestAsync({
	  host: 'http://localhost',
	  path: '/v1/eval',
	  port: 8011,
	  method: 'POST',
	  json: false,
	  body: bodyXML,
	  headers: {
	        'Accept': 'multipart/mixed',
	        'Content-Type': 'application/x-www-form-urlencoded'
	  }
	})
	.then(function (response) {
		console.log("Response Below:");
		parseResponse(queryName, response);
	})
	.catch(function (error) {
	  console.log('error');
	  console.log(error);
	});
}

function parseResponse(queryName, res){
	if (queryName == null) {
		console.log("null!");
	}
	else if (queryName == "hello") {
		console.log("hello");
		console.log(res.body);
	}
	else {
		console.log("damn!");
	}
}

submitRequest("hello", query);


/*
digestRequest.requestAsync({
  host: 'http://httpbin.org',
  path: '/post',
  port: '',
  method: 'POST',
  json: true,
  body: {
    'JSON BODY DATA': 'TEST'
  },
  headers: {
        'Content-Type': 'application/json'
  }
})
.then(function (response) {
  console.log('response:');
  console.log(response.body);
})
.catch(function (error) {
  console.log('error');
  console.log(error);
});
*/














/*var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var crypt = require('crypto');

var domain = 'http://localhost';
var port = '8011';
var urlpath = '/v1/search?format=xml'
var username = 'admin';
var password = 'admin';
var url = domain + ':' + port + urlpath;

console.log(url);

var xhr = new XMLHttpRequest();
//console.log(xhr);

xhr.onReadyStateChange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
    console.log(xhr.responseXML);
  }
};

xhr.open("GET", "http://httpbin.org/get", true);
xhr.send();


/*
var credentials = {
  username: 'admin',
  password: 'admin',
  realm: 'Digest Authentication'
}

function cryptoCreateHash(data) {
    return crypt.createHash('md5').update(data).digest('hex');
}

var hash = cryptoCreateHash(credentials.realm);



function authenticateUser(res) {
    console.log({ 'WWW-Authenticate': 'Digest realm="' + credentials.realm + '",qop="auth",nonce="' + Math.random() + '",opaque="' + hash + '"' });
    res.writeHead(401, { 'WWW-Authenticate': 'Digest realm="' + credentials.realm + '",qop="auth",nonce="' + Math.random() + '",opaque="' + hash + '"' });
    res.end('Authorization is needed.');
}
 

function parseAuthenticationInfo(authData) {
    var authenticationObj = {};
    authData.split(', ').forEach(function (d) {
        d = d.split('=');
 
        authenticationObj[d[0]] = d[1].replace(/"/g, '');
    });
    console.log(JSON.stringify(authenticationObj));
    return authenticationObj;
}
 

var server = http.createServer(function (request, response) {
    var authInfo, digestAuthObject = {};
 
    
    if (!request.headers.authorization) {
        authenticateUser(response);
        return;
    }
 
    
    authInfo = request.headers.authorization.replace(/^Digest /, '');
    authInfo = parseAuthenticationInfo(authInfo);
 
    
    if (authInfo.username !== credentials.userName) {
        authenticateUser(response); return;
    }
 
    
    digestAuthObject.ha1 = cryptoCreateHash(authInfo.username + ':' + credentials.realm + ':' + credentials.password);
 
    
    digestAuthObject.ha2 = cryptoCreateHash(request.method + ':' + authInfo.uri);
 
    
    var resp = cryptoCreateHash([digestAuthObject.ha1, authInfo.nonce, authInfo.nc, authInfo.cnonce, authInfo.qop, digestAuthObject.ha2].join(':'));
    
    digestAuthObject.response = resp;
 
    
    if (authInfo.response !== digestAuthObject.response) {
        authenticateUser(response); return;
    }
     
    response.end('Congratulations!!!! You are successfully authenticated');
 
});
server.listen(5555);

*/
