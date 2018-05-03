var str = "State:AL,Application Count:2,Metric2:123";


function parseData(response){

  var parsedData = {};


  var regex = /State:\.*[^\-]+/g; //from "State:" to "-", g=global (all matches) 
  var regexResult;
  while (regexResult = regex.exec(response)){

    var splitMetrics = regexResult[0].split(","); //[0] is full regex match, [>0] are submatches

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

  console.log(parsedData);
}

parseData(str);