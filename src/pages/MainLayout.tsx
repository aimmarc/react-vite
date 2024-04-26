import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './MainLayout.less';
import {
	Layout,
	Breadcrumb,
	Button,
	Dropdown,
	Menu,
	Avatar,
} from '@arco-design/web-react';
import SiderBar from '@/components/SiderBar';
import {
	findBreadByPathname,
	findPageTitleByPathname,
	findRouteByPath,
} from '@/utils';
import { IconMoon, IconSun, IconUser } from '@arco-design/web-react/icon';
import { StorageConst } from '@/common/constant/storage';
import { ThemeMode } from '@/common/enums/theme';
import routerConfig from '@/common/config/router.config';
import { useAppStore } from '@/store/app';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const BaseLayout: React.FC = () => {
	const local = useLocation();
	const navigator = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const { appStore, setDarkMode } = useAppStore();

	function buildBread() {
		return (
			<Breadcrumb style={{ margin: '16px 0' }}>
				{findBreadByPathname(local.pathname).map((route, index) => (
					<Breadcrumb.Item
						key={`${route.path}${index}`}
						href={route.path}
					>
						{route.name}
					</Breadcrumb.Item>
				))}
			</Breadcrumb>
		);
	}

	const dropList = (
		<Menu>
			<Menu.Item key="1">修改个人信息</Menu.Item>
			<Menu.Item
				key="2"
				onClick={() =>
					navigator('/user/login', {
						replace: true,
					})
				}
			>
				退出登录
			</Menu.Item>
		</Menu>
	);

	useEffect(() => {
		const route = findRouteByPath(routerConfig, local.pathname);
		document.title = `${appStore?.settings?.appName}-${route?.name}`;
	}, [local.pathname]);

	return (
		<Layout className="layout-collapse-demo arco-layout-has-sider">
			<SiderBar
				collapsed={collapsed}
				handleCollapsed={(state) => setCollapsed(state)}
			/>
			<Layout className="right-layout">
				<Header style={{ paddingLeft: 20 }}>
					<h3>{findPageTitleByPathname(local.pathname)}</h3>
					<div className="header-center"></div>
					<div className="header-right">
						<Button
							icon={
								appStore.darkMode ? <IconSun /> : <IconMoon />
							}
							iconOnly
							shape="circle"
							onClick={() => {
								const themeMode =
									(localStorage.getItem(
										StorageConst.ARCO_THEME
									) || ThemeMode.LIGHT) === ThemeMode.LIGHT
										? ThemeMode.DARK
										: ThemeMode.LIGHT;
								document.body.setAttribute(
									'arco-theme',
									themeMode
								);
								localStorage.setItem(
									StorageConst.ARCO_THEME,
									themeMode
								);
								setDarkMode(themeMode === ThemeMode.DARK);
							}}
						></Button>
						<Dropdown droplist={dropList} position="bl">
							<Avatar
								size={30}
								style={{ marginLeft: 20, cursor: 'pointer' }}
							>
								<IconUser />
							</Avatar>
						</Dropdown>
					</div>
				</Header>
				<Layout style={{ padding: '0 24px' }} className="main-layout">
					{buildBread()}
					<Content>
						<Outlet />
					</Content>
					<Footer>{appStore?.settings.footerTip}</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
