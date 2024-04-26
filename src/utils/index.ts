import routerConfig from '@/common/config/router.config';
import { IRouterConfig } from '@/router';

/**
 * 根据path找到路由
 * @param routes
 * @param path
 * @returns
 */
export function findRouteByPath(
	routes: IRouterConfig[] = routerConfig,
	path: string
): IRouterConfig | undefined {
	for (const route of routes) {
		// 检查当前路由对象的 path 是否匹配
		if (route.path === path) {
			return route;
		}
		// 如果存在子路由，递归地在子路由中查找
		if (route.children) {
			const found = findRouteByPath(route.children, path);
			if (found) {
				return found;
			}
		}
	}
	// 如果没有找到匹配的路由，返回 undefined
	return undefined;
}

/**
 * 根据pathname找到页面名称
 * @param pathname
 * @returns
 */
export function findPageTitleByPathname(pathname = '') {
	findRouteByPath(routerConfig, pathname);
	return findRouteByPath(routerConfig, pathname)?.name || '';
}

function splitPathIntoFullSegments(inputPath = '') {
	// 拆分路径为单独的部分
	const parts = inputPath.split('/').filter(Boolean);

	// 用于存储最终的路径数组
	const fullPathSegments = ['/'];

	// 遍历路径的每个部分，构建从根到当前部分的完整路径
	parts.forEach((part, index) => {
		// 每一部分的完整路径是之前部分的路径加上当前部分
		// 第一个部分的前置路径是 '/'，之后的部分则需要从 fullPathSegments 中获取上一次的完整路径
		const prefix = index === 0 ? '' : fullPathSegments[index];
		fullPathSegments.push(`${prefix}/${part}`);
	});

	// 如果原始路径不是根路径，则移除数组中的第一个元素（即空字符串）
	return inputPath !== '/' ? fullPathSegments : ['/'];
}

export function findBreadByPathname(pathname = ''): IRouterConfig[] {
	const paths = splitPathIntoFullSegments(pathname);
	const breadItems = paths.map((item) => {
		const route = findRouteByPath(routerConfig, item);
		return route;
	});
	return breadItems.filter((r) => r) as IRouterConfig[];
}
