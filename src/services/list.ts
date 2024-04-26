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
