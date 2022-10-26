import axios from 'axios';
import { SetupInterceptors } from './SetupInterceptors';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const http = axios.create({
	baseURL: BASE_URL,
});

SetupInterceptors(http);

export default http;
