export interface IPaginationResponse<T = Record<string, any>> {
	total: number;
	list: T[];
}
