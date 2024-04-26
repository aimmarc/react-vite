import { Recordable } from 'vite-plugin-mock';

export function resultSuccess<T = Recordable>(data: T, { message = 'ok' } = {}) {
    return {
        code: 10000,
        data,
        message,
        type: 'success',
    };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
    const offset = (pageNo - 1) * Number(pageSize);
    return offset + Number(pageSize) >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + Number(pageSize));
}

export function resultPageSuccess<T = any>(
    page: number,
    pageSize: number,
    list: T[],
    { message = 'ok', total = 20 } = {},
) {
    const pageData = pagination(page, pageSize, list);

    return {
        ...resultSuccess({
            items: pageData,
            total,
        }),
        message,
    };
}

export function resultError(message = 'Request failed', { code = 102, data = null } = {}) {
    return {
        code,
        data,
        message,
        type: 'error',
    };
}

export interface requestParams {
    method: string;
    body: any;
    headers?: { authorization?: string };
    query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
    return headers?.authorization;
}
