const app = require('express')();
const WebSocket = require('ws');
const db = require('./db');
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
	setTimeout(
		() => res.json(db.users),
		500
	)
})
app.get('/user/:userId', function(req, res) {
	const id = req.params.userId;
	const userData = db.extendedData[id];
	setTimeout(
		() => res.json(userData),
		id * 750
	)
})

app.listen(2323);
