import { IPaginationResponse } from '@/common/interfaces/request';
import request from '@/utils/request';

export async function listTable(params: {
	page: number;
	pageSize: number;
}): Promise<IPaginationResponse> {
	return request.get('/api/list/tableList', {
		params,
	});
}

export async function listMessage(): Promise<Record<string, any>[]> {
	return request.get('/api/list/message');
}
