var request = require('auth-request');

//avoid "access-control-allow-origin" errors, run chrome through cmd: <path_to_chrome.exe>/chrome.exe --disable-web-security --user-data-dir

window.runQuery = function(queryName){

  var queryData = getQueryData(queryName); 
  if (queryData == null){
    return;
  }

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
      document.getElementById("queryNotes").innerHTML = "Query Errored Out:<br/>" + err;
    }
    else{
      var data = parseResponse(res.data);
      fillMap(data, queryData.thresholdFocus, queryData.thresholds);
    }
  });
}

function parseResponse(response){

  var parsedData = {}; // {stateAbrv: {data key:value, ...}, ...}

  var regex = /state:\.*[^\-]+/g; //from "state:" to "-", g=global (all matches) 
  var regexResult;
  while (regexResult = regex.exec(response)){
    regexResult[0] = regexResult[0].trim(); 
    var splitMetrics = regexResult[0].split(","); 

    //extract state abbreviation and metrics
    var stateAbrv;
    var stateData = {};
    for (var item of splitMetrics){
      var metric = item.split(":");
      if (metric[0] == "state"){
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


function fillMap(data, thresholdFocus, thresholds){
  uStates.draw("#statesvg", data, thresholdFocus, thresholds);
}
