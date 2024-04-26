import React, { useEffect, useState } from 'react';
import { Layout, Menu } from '@arco-design/web-react';
import * as icons from '@arco-design/web-react/icon';
import routerConfig from '@/common/config/router.config';
import { IRouterConfig } from '@/router';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.less';
import Logo from '../Logo';

const { IconCaretRight, IconCaretLeft } = icons;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;

export interface ISiderBarProps {
	collapsed: boolean;
	handleCollapsed: (arg: boolean) => void;
}

const SiderBar: React.FC<ISiderBarProps> = (props) => {
	const menuConfig: IRouterConfig[] =
		routerConfig.find((r) => r.path === '/')?.children || [];
	const loca = useLocation();
	const navigate = useNavigate();
	const [selectedKeys, setKeys] = useState<string[]>([]);
	const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);

	/**
	 * 构建菜单
	 * @param item
	 * @returns
	 */
	function buildMenu(item: IRouterConfig) {
		if (!item.path || item.redirect || !item.name) return null;
		const icon = icons[item.icon as never] as never;
		if (item.children) {
			return (
				<SubMenu
					key={item.path || ''}
					title={
						<span>
							{icon ? React.createElement(icon) : null}
							{item.name}
						</span>
					}
				>
					{item.children.map((i) => buildMenu(i))}
				</SubMenu>
			);
		}
		return (
			<MenuItem key={item.path || ''}>
				{icon ? icon : null}
				{item.name}
			</MenuItem>
		);
	}

	/**
	 * 找到需要open的subMenuKeys
	 * @param list
	 * @param parent
	 * @param parentKeys
	 * @returns
	 */
	function findOpenKeys(
		list: IRouterConfig[],
		parent?: IRouterConfig,
		parentKeys: string[] = []
	) {
		let isOpen = false;
		list?.forEach((el) => {
			if (location.pathname === '/') {
				const targetChildren = routerConfig.find(
					(x) => x.path === '/'
				)?.children;
				if (targetChildren && targetChildren?.length > 0) {
					setDefaultOpenKeys([
						targetChildren?.[0]?.redirect as string,
					]);
					return;
				}
			}
			if (el?.path === location.pathname && parent?.path) {
				isOpen = true;
				parentKeys.push(parent?.path as string);
			}
			if (el?.children && el?.children?.length > 0) {
				const res = findOpenKeys(el?.children, el, parentKeys);
				if (res.isOpen) parentKeys.push(parent?.path as string);
			}
		});
		return { isOpen, parentKeys };
	}

	useEffect(() => {
		setKeys([loca.pathname]);
		const res = findOpenKeys(menuConfig);
		if (res.parentKeys.length > 0)
			setDefaultOpenKeys([
				...new Set(
					[...defaultOpenKeys, ...res.parentKeys].filter((x) => x)
				),
			]);
	}, [loca.pathname]);

	return (
		<Sider
			collapsed={props.collapsed}
			onCollapse={(state) => props.handleCollapsed(state)}
			collapsible
			trigger={props.collapsed ? <IconCaretRight /> : <IconCaretLeft />}
			breakpoint="xl"
			className="vite-react-sider-bar"
		>
			<Logo onClick={() => navigate('/')}></Logo>
			<Menu
				openKeys={defaultOpenKeys}
				onClickMenuItem={(key) => navigate(key)}
				style={{ width: '100%' }}
				selectedKeys={selectedKeys}
				onClickSubMenu={(key) => {
					let keys = [];
					if (defaultOpenKeys.includes(key as string)) {
						keys = defaultOpenKeys.filter((k) => k !== key);
					} else {
						keys = [...defaultOpenKeys, key];
					}
					setDefaultOpenKeys(keys);
				}}
			>
				{menuConfig.map((item) => buildMenu(item))}
			</Menu>
		</Sider>
	);
};

export default SiderBar;
