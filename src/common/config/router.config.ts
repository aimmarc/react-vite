import { IRouterConfig } from '@/router';

const routerConfig: IRouterConfig[] = [
	{
		name: '首页',
		path: '/',
		component: '/MainLayout',
		children: [
			{
				path: '/',
				redirect: '/dashboard',
			},
			{
				path: '/dashboard',
				name: '仪表盘',
				icon: 'IconDashboard',
				children: [
					{
						path: '/dashboard',
						redirect: '/dashboard/workplace',
					},
					{
						path: '/dashboard/workplace',
						name: '工作台',
						component: '/dashboard/Workplace/index',
					},
					{
						path: '/dashboard/monitor',
						name: '分析页',
						component: '/dashboard/monitor/index',
					},
				],
			},
			{
				path: '/list',
				name: '列表',
				icon: 'IconList',
				children: [
					{
						path: '/list',
						redirect: '/list/tableList',
					},
					{
						path: '/list/tableList',
						name: '数据表格',
						component: '/list/TableList',
					},
					{
						path: '/list/more',
						name: '更多列表',
						icon: 'IconDragDot',
						children: [
							{
								path: '/list/more',
								redirect: '/list/more/cardList',
							},
							{
								path: '/list/more/cardList',
								name: '卡片列表',
								component: '/list/more/CardList',
							},
							{
								path: '/list/more/cellList',
								name: '单元列表',
								component: '/list/more/CellList',
							},
						],
					},
				],
			},
			{
				path: '/form',
				name: '表单',
				icon: 'IconNav',
				children: [
					{
						path: '/form',
						redirect: '/form/baseForm',
					},
					{
						path: '/form/baseForm',
						name: '基础表单',
						component: '/form/BaseForm',
					},
				],
			},
			{
				path: '404',
			},
		],
	},
	{
		path: '/user/login',
		name: '用户登录',
		component: '/UserLogin',
	},
	{
		path: '404',
	},
];

export default routerConfig;
