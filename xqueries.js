//1: all xquery return values should be formatted: "state:abbreviation,metric1:value,metric2:value..."
//2: all xqueries must be prefaced with "xquery=" for REST eval
//3: getQuery should return a map with
//	(a) the query, 
//	(b) the field/metric the thresholds will be applied to (string),
//	(c) the thresholds labelled low, med, high (dictionary) 
//4: thresholdFocus text should match the xquery output or color coding will not be found

function getQueryData(queryName){

	var map = {};

	if (queryName == "appCountQuery"){
		map.query = appCountQuery;
		map.thresholdFocus = appCountQueryFocus; //make sure name matches the xquery or color will be off
		map.thresholds = appCountQueryThresholds;
		return map;
	}
	else if (queryName == "secondQuery"){
		map.query = secondQuery;
		map.thresholdFocus = secondQueryFocus;
		map.thresholds = secondQueryThresholds;
		return map;
	}
	else {
		document.getElementById("test").innerHTML = "Query Request Not Formatted Properly";
		return null;
	}
}

var secondQueryFocus = "New Metric";
var secondQueryThresholds = {low:10, med:20, high:10000};
var secondQuery = 
`xquery=
xquery version "1.0-ml";

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
	let $uri := fn:concat("/", $state, "/gov/ffe/InsuranceApplication/")
return fn:concat("state:", $state, ",Second Query:", fn:count(xdmp:directory($uri, "1")), ",New Metric:", "123")`;


var appCountQueryFocus = "Application Count";
var appCountQueryThresholds = {low:10, med:15, high:10000};
var appCountQuery = 
`xquery=
xquery version "1.0-ml";

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
	let $uri := fn:concat("/", $state, "/gov/ffe/InsuranceApplication/")
return fn:concat("state:", $state, ",Application Count:", fn:count(xdmp:directory($uri, "1")), ",Metric2:", "123")`;