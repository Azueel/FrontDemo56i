import axios from 'axios';

const pruebaApi = axios.create({
	baseURL: 'http://localhost:4040',
});

export default pruebaApi;
