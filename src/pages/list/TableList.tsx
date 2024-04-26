import React, { useEffect, useState } from 'react';
import {
	Table,
	Form,
	Grid,
	Input,
	Select,
	InputNumber,
	Space,
	Button,
	Divider,
	Tag,
	TableColumnProps,
} from '@arco-design/web-react';
import { IconDown, IconUp } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { listTable } from '@/services/list';

const columns: TableColumnProps[] = [
	{
		title: '用户名称',
		dataIndex: 'name',
		fixed: 'left',
	},
	{
		title: '用户性别',
		dataIndex: 'gender',
		render: (gender: string) => (
			<span>{Number(gender) === 1 ? '男' : '女'}</span>
		),
	},
	{
		title: '年龄',
		dataIndex: 'age',
	},
	{
		title: '用户地址',
		dataIndex: 'address',
	},
	{
		title: '电话号码',
		dataIndex: 'phone',
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: '状态',
		dataIndex: 'state',
		width: 100,
		render: (text: string) => <Tag>{text}</Tag>,
	},
	{
		title: '操作',
		width: 300,
		fixed: 'right',
		render: () => (
			<>
				<Button type="text">查看</Button>
				<Divider type="vertical" />
				<Button type="text">编辑</Button>
				<Divider type="vertical" />
				<Button type="text">删除</Button>
			</>
		),
	},
];

const TableList: React.FC = () => {
	const [params, setParams] = useState({
		page: 1,
		pageSize: 10,
	});
	const [collapse, setCollapse] = useState(false);
	const { data, run } = useRequest(listTable, {
		defaultParams: [params],
		cacheTime: 3000,
		cacheKey: 'listTable',
	});

	useEffect(() => {
		console.log('mounted');
	}, []);

	return (
		<div className="page-content-with-padding page-content-with-bg">
			<Form
				id="searchForm"
				layout="horizontal"
				labelAlign="right"
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
			>
				<Grid.Row gutter={24}>
					<Grid.Col span={8}>
						<Form.Item label="用户名称" field="name">
							<Input placeholder="enter name" />
						</Form.Item>
					</Grid.Col>
					<Grid.Col span={8}>
						<Form.Item label="用户性别" field="gender">
							<Select
								placeholder="select gender"
								options={['All', 'Female', 'Male', 'Unknown']}
							/>
						</Form.Item>
					</Grid.Col>
					<Grid.Col span={8}>
						<Form.Item label="年龄" field="age">
							<InputNumber placeholder="enter age" />
						</Form.Item>
					</Grid.Col>
				</Grid.Row>
				{collapse ? (
					<Grid.Row gutter={24}>
						<Grid.Col span={8}>
							<Form.Item label="用户名称" field="name">
								<Input placeholder="enter name" />
							</Form.Item>
						</Grid.Col>
						<Grid.Col span={8}>
							<Form.Item label="用户性别" field="gender">
								<Select
									placeholder="select gender"
									options={[
										'All',
										'Female',
										'Male',
										'Unknown',
									]}
								/>
							</Form.Item>
						</Grid.Col>
						<Grid.Col span={8}>
							<Form.Item label="年龄" field="age">
								<InputNumber placeholder="enter age" />
							</Form.Item>
						</Grid.Col>
					</Grid.Row>
				) : null}
				<div style={{ textAlign: 'right' }}>
					<Space>
						<Button htmlType="submit" type="primary">
							查询
						</Button>
						<Button onClick={() => {}}>新增</Button>
						<Button
							icon={collapse ? <IconUp /> : <IconDown />}
							onClick={() => setCollapse(!collapse)}
						>
							{collapse ? '收起' : '展开'}
						</Button>
					</Space>
				</div>
			</Form>
			<Divider />
			<Table
				scroll={{
					x: 1200,
					y: 550,
				}}
				rowKey="id"
				columns={columns}
				data={data?.list}
				border={false}
				pagination={{
					total: data?.total,
					pageSize: params.pageSize,
					current: params.page,
					showJumper: true,
					showMore: true,
					showTotal: true,
					sizeCanChange: true,
					onChange: (page, pageSize) => {
						run({
							page,
							pageSize,
						});
						setParams({
							page,
							pageSize,
						});
					},
				}}
			/>
		</div>
	);
};

export default TableList;
