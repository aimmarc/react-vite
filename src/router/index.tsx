import React, { ComponentType } from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	Outlet,
} from 'react-router-dom';
import routerConfig from '@common/config/router.config';
import ErrorBoundary from '@/components/exceptional/ErrorBoundary';
const modules = import.meta.glob('../pages/**/*.tsx');

/**
 * 路由配置
 */
export interface IRouterConfig {
	name?: string; // 路由名称
	path?: string; // 路由路径，仅支持绝对路径，相对路径会导致导航菜单渲染异常
	component?: string; // 组件路径
	redirect?: string; // 重定向
	children?: IRouterConfig[]; // 子路由
	icon?: string;
}

const NotFound = React.lazy(() => import('@/pages/404'));
const Wrap = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

/**
 * 根据配置生成路由
 * @param routes
 * @returns
 */
const buildRouter = (routes: IRouterConfig[]) => {
	return routes.map((route, index) => {
		if (route.path === '404') {
			return <Route path="*" element={<NotFound />} key={index} />;
		}
		if (route.redirect) {
			return (
				<Route
					path={route.path}
					key={route.path || index}
					element={<Navigate to={route.redirect} />}
				/>
			);
		} else if (route.path) {
			const Page = modules[`../pages${route.component}.tsx`];
			const RouterComponent = Page
				? React.lazy(
						Page as () => Promise<{ default: ComponentType<any> }>
				  )
				: Wrap;
			return (
				<Route
					path={route.path}
					element={
						<ErrorBoundary>
							<React.Suspense>
								<RouterComponent />
							</React.Suspense>
						</ErrorBoundary>
					}
					key={route.path}
				>
					{route.children?.length
						? buildRouter(route.children)
						: null}
				</Route>
			);
		}
		return null;
	});
};

const BaseRouter = () => {
	return (
		<BrowserRouter>
			<Routes>{buildRouter(routerConfig)}</Routes>
		</BrowserRouter>
	);
};

export default BaseRouter;
