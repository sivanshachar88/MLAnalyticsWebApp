var express = require('express');
var path    = require('path');


var app = express();
app.use(express.static(__dirname));

var port = 3000;

app.listen(port, console.log('Server listening on port: ' + port));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});
