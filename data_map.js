// var digestRequest = require('request-digest')('admin', 'admin');
var request = require('auth-request');

//chrome.exe --disable-web-security --user-data-dir

// var sampleData ={}; /* Sample random data. */ 
// ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
// "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
// "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
// "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
// "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
// .forEach(function(d){ 
//   var low=Math.round(100*Math.random()), 
//   mid=Math.round(100*Math.random()), 
//   high=Math.round(100*Math.random());
//   sampleData[d]={
//     Low:"12", 
//     'High Value':"14", 
//     Avg:"13", 
//     PercentageBARed: 70,
//     New:1
//   }; 
// });

// var thresholds = {low: 10, med: 50, high: 90};


window.runQuery = function(queryName){

  var queryData = getQueryData(queryName); 

  var options = {
    scheme: 'http',
    hostname: 'localhost',
    port: 8011,
    path: '/v1/eval',
    method: 'POST',
    headers: {
      'Accept': 'multipart/mixed',
      'Content-Type': 'application/x-www-form-urlencoded'     
    },
    data: queryData.query,
    username: 'admin',
    password: 'admin'
  };

  request(options, function (err, res) {
    if (err) {
      document.getElementById("test").innerHTML += "Got error" + err;
    }
    else{
      alert(res.data);
      var data = parseResponse(res.data);
      //document.getElementById("test").innerHTML += tooltipHtml("AL", data["AL"]);
      redrawMap(data, queryData.thresholdFocus, queryData.thresholds);
    }
  });
}

function parseResponse(response){

  var parsedData = {}; // {StateAbrv: {data key:value, ...}, ...}


  var regex = /State:\.*[^\-]+/g; //from "State:" to "-", g=global (all matches) 
  var regexResult;
  while (regexResult = regex.exec(response)){

    regexResult[0] = regexResult[0].trim(); //[0] is full regex match, [>0] are submatches
    var splitMetrics = regexResult[0].split(","); 

    //extract state abbreviation and metrics
    var stateAbrv;
    var stateData = {};
    for (var item of splitMetrics){
      var metric = item.split(":");
      if (metric[0] == "State"){
        stateAbrv = metric[1];
      }
      else{
        stateData[metric[0]] = metric[1];
      }
    }

    parsedData[stateAbrv] = stateData;
  }

  return parsedData;
}


function redrawMap(data, thresholdFocus, thresholds){
  uStates.draw("#statesvg", data, tooltipHtml, thresholdFocus, thresholds);

  d3.select("#statesvg"); 
}


function tooltipHtml(state, data){  
  var table = "<table><h4>" + state + "</h4>"
  // Object.keys(data).forEach(function(key){
  for (var key in data){
    table += "<tr><td>" + key + "</td><td>" + data[key] + "</td></tr>"
  }
  table += "</table>"
  return table;
}

// window.runQuery1 = function(){
//   var abc = "text";
//   document.getElementById("test").innerHTML = abc;
//   alert(stateQuery);
//   try{
//     digestRequest.requestAsync({
//       host: 'http://localhost',
//       path: '/v1/eval',
//       port: 8011,
//       method: 'POST',
//       json: false,
//       body: stateQuery,
//       headers: {  
//         'Accept': 'multipart/mixed',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//     .then(function (response) {
//       console.log(response.body);
//       alert("in promise response");
//       document.getElementById("test").innerHTML = "ASNYC UPDATE SUCCESS";
//     })
//     .catch(function (error) {
//       console.log('Error' + String(error));
//       alert("in promise error");
//     }); 
//   }catch(err){
//     alert("could not run request");
//   }
// }
