import Axios from 'axios';
var axios = Axios.create({
  baseURL: '/api'
});

export default {
	getUsers() {
		return axios.get('/users');
	},
	getUserById(id) {
		return axios.get(`/user/${id}`);
	},
	ws: {
		open(hostname) {
			const ws = new WebSocket(hostname);

			return new Promise((resolve, reject) => {
				ws.onopen = () => resolve(ws);
				ws.onerror = (err) => {
					reject(new Error(err));
				};
			});
		},
		onReceive(ws, cb) {
			ws.onmessage = cb;
		},
		onClose(ws, cb) {
			ws.onclose = cb;
		},
		send(ws, msg) {
			ws.send(msg);
		},
		close(ws) {
			ws.close();
		},
	},
}