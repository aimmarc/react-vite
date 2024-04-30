import { resultSuccess } from './_utils';
import Mock, { Random } from 'mockjs';

export default [
	{
		url: '/api/card/list',
		method: 'get',
		response: () => {
			return resultSuccess([
				{
					title: '内容质检',
					list: [
						{
							title: '视频类-历史导入',
							time: '2021-10-12 00:00:00',
						},
						{
							title: '图文类-图片版权',
							time: '2021-10-12 00:00:00',
						},
						{
							title: '图文类-高清图片',
							time: '2021-10-12 00:00:00',
						},
					],
				},
				{
					title: '开通服务',
					list: [
						{
							title: '视频类-历史导入',
							desc: '用户行为分析之漏斗分析模型是企业实现精细化运营、进行用户行为分析的重要数据分析模型。',
							tag: '已开通',
							type: 'success',
						},
						{
							title: '图文类-图片版权',
							desc: '快速诊断用户人群，地域细分情况，了解数据分布的集中度，以及主要的数据分布的区间段是什么。',
							tag: '已过期',
							type: 'error',
						},
						{
							title: '图文类-高清图片',
							desc: '移动端动态化资源分发解决方案。提供稳定大流量服务支持、灵活定制的分发圈选规则，通过离线化预加载。',
							tag: '未开通',
							type: 'info',
						},
						{
							title: '图文类-高清图片',
							desc: '用户画像就是将典型用户信息标签化，根据用户特征、业务场景和用户行为等信息，构建一个标签化的用户模型。',
							tag: '已开通',
							type: 'success',
						},
					],
				},
				{
					title: '规则预置',
					list: [
						{
							title: '内容屏蔽规则',
							desc: '用户在执行特定的内容分发任务时，可使用内容屏蔽规则根据特定标签，过滤内容集合。',
							tag: '已启用',
							type: 'success',
						},
						{
							title: '内容置顶规则',
							desc: '该规则支持用户在执行特定内容分发任务时，对固定的几条内容置顶。',
						},
						{
							title: '内容加权规则',
							desc: '选定内容加权规则后可自定义从不同内容集合获取内容的概率。',
						},
						{
							title: '内容分发规则',
							desc: '内容分发时，对某些内容需要固定在C端展示的位置。',
							tag: '已启用',
							type: 'success',
						},
						{
							title: '违禁内容识别',
							desc: '精准识别赌博、刀枪、毒品、造假、贩假等违规物品和违规行为。',
						},
						{
							title: '多语言文字符号识别',
							desc: '精准识别英语、维语、藏语、蒙古语、朝鲜语等多种语言以及emoji表情形态的语义识别。',
							tag: '已启用',
							type: 'success',
						},
					],
				},
			]);
		},
	},
	{
		url: '/api/list/tableList',
		method: 'get',
		timeout: 1000,
		response: (req: any) => {
			return resultSuccess(
				Mock.mock({
					[`list|${req.query.pageSize}`]: [
						{
							id: '@id',
							name: '@cname',
							age: Random.integer(1, 100),
							address: '@county',
							city: '@city',
							province: '@province',
							email: Random.email(),
							phone: /^1[0-9]{10}$/,
							regin: '@region',
							url: '@url',
							date: Random.date('yyyy-MM-dd'),
							'gender|1': ['1', '2'],
							'state|1': ['新增', '已通过', '待审核'],
							'enable|1': ['0', '1'],
						},
					],
					total: 100,
				})
			);
		},
	},
	{
		url: '/api/list/message',
		method: 'get',
		timeout: 500,
		response: () => {
			return resultSuccess(
				Mock.mock({
					['data|6']: [
						{
							username: '@cname',
							content: '@cword(10, 30)',
							time: Random.date('yyyy-MM-dd'),
						},
					],
				}).data
			);
		},
	},
];
