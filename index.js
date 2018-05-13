const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'resources')))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/resources/index.html');
});
const server = app.listen(process.env.NODE_PORT || 8080, () => {
  console.log(`Listening at http:localhost:${server.address().port}`);
});
