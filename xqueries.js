//1: all xquery return values should be formatted: "state:abbreviation,metric1:value,metric2:value..."
//2: all xqueries must be prefaced with "xquery=" for REST eval
//3: getQuery function should return a map with
//	(a) "query" - the text of the query, 
//	(b) "thresholdFocus" - the field/metric the thresholds will be compared to (string),
//	(c) "thresholds" - the thresholds object with two elements: low, high (dictionary). <low=RED, >low&<high=YELLOW, >high=GREEN
//4: thresholdFocus text should match the xquery output or color coding will not be found

function getQueryData(queryName){

	var map = {}; 

	if (queryName == "appCountQuery"){
		return appCountQuery;
	}
	else if (queryName == "sampleQuery"){
		return sampleQuery;
	}
	else {
		document.getElementById("queryNotes").innerHTML = "Requested queryName was not found. Check button mapping.";
		return null;
	}
}

var appCountQuery = {
	thresholdFocus:"Application Count",
	thresholds:{low:10, high:20},
	query:
	`xquery=
	xquery version "1.0-ml";

	declare namespace p="http://persistence.etc.gov";

	let $_ := xdmp:set-request-time-limit(60)

	let $states := (
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DC",
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
		let $uri := fn:concat("/", $state, "/gov/Application/")
	return fn:concat("state:", $state, ",Application Count:", fn:count(xdmp:directory($uri, "1")), ",Metric2:", "123")`
}

var sampleQuery = {
	thresholdFocus:"New Metric",
	thresholds:{low:10, high:90},
	query:
	`xquery=
	xquery version "1.0-ml";

	declare namespace p="http://persistence.etc.gov";

	let $_ := xdmp:set-request-time-limit(60)

	let $states := (
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DC",
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
		let $uri := fn:concat("/", $state, "/gov/Application/")
	return fn:concat("state:", $state, ",Second Query:", fn:count(xdmp:directory($uri, "1")), ",New Metric:", "123")`
}