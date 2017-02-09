import Axios from 'axios';
var axios = Axios.create({
  baseURL: '/api'
});

export default {
	getUsers() {
		return axios.get('/users');
	},
}