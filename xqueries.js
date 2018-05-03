//Rule 1: all xquery return values should be formatted: "State:Abbreviation,Metric1:Value,Metric2:Value..."
//Rule 2: all xqueries must be prefaced with "xquery=" for REST eval command
//Rule 3: function getQuery should return 
//	(a) the query, 
//	(b) the field/Metric the thresholds will be applied to (string),
//	(c) the thresholds (dictionary) (low, med, high)

function getQueryData(queryName){

	var map = {};

	if (queryName == "stateQuery"){

		map.query = stateQuery;
		map.thresholdFocus = "Application Count";
		map.thresholds = {low:10, med:50, high:10000};
		return map;

	}
	else {
		document.getElementById("test").innerHTML = "Query Request Not Formatted Properly";
		return null;
	}
}

var stateQuery = 
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
return fn:concat("State:", $state, ",Application Count:", fn:count(xdmp:directory($uri, "1")), ",Metric2:", "123")`;