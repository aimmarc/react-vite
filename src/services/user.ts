import request from '@/utils/request';

export interface IUserLoginParams {
	account: string;
	password: string;
}

export function userLogin(data: IUserLoginParams) {
	return request.post('/api/user/login', data);
}
