const app = require('express')();
const WebSocket = require('ws');
const db = require('./src/db');
const wss = new WebSocket.Server({ port: 2322 });


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  	setTimeout(
	    () => ws.send('wat?  ' + message ),
	    500)
  });

  ws.send('hi');
});

app.get('/users', function(req, res) {
	// res.send('[{"id": 1, "name": "BOB"}]')
	res.json([{id: 1, name: "BOB"}])
})

app.listen(2323);
