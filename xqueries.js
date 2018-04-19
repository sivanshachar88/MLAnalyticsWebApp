module.exports = { 

stateQuery:
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
  return fn:concat("State-", $state, ":", fn:count(xdmp:directory($uri, "1")))`

}
