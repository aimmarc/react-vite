import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const request = axios.create({
	baseURL: import.meta.env.VITE_API_PREFIX,
	headers: {},
});

request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 对请求配置作处理，加入token等等
		return config;
	},
	(error: Error) => {
		console.log('request error', error);
		return Promise.reject(error);
	}
);

request.interceptors.response.use(
	(response: AxiosResponse) => {
		const { data } = response;
		if (Number(data.code) === 10000) {
			return data.data;
		}
		return Promise.reject(data.message);
	},
	(error: Error) => {
		Promise.reject(error);
		return error;
	}
);

export default request;
