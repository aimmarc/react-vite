import {
	Table,
	TableColumnProps,
	Tag,
	Typography,
} from '@arco-design/web-react';
import React from 'react';
import './index.less';

export default function QuickOperation(): React.ReactNode {
	const columns: TableColumnProps[] = [
		{
			title: '序号',
			render: (_col, _record, index) => <span>{index + 1}</span>,
		},
		{
			title: '封面',
			dataIndex: 'cover',
			render: (_col, record) => (
				<div className={'data-statistic-list-cover-wrapper'}>
					<img src={record.cover} />
					{record.status === -1 && (
						<Tag
							color="red"
							className={'data-statistic-list-cover-tag'}
						>
							审核未通过
						</Tag>
					)}
				</div>
			),
		},
		{
			title: '名称',
			dataIndex: 'name',
		},
		{
			dataIndex: 'duration',
			title: '视频时长',
		},
		{
			dataIndex: 'id',
			title: '视频ID',
		},
	];
	const data = [
		{
			cover: 'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp',
			name: '视频直播',
			duration: '00:05:19',
			id: '54e23ade',
			status: -1,
		},
	];
	return (
		<div>
			<Table
				columns={columns}
				data={data}
				rowKey="id"
				rowSelection={{
					type: 'checkbox',
				}}
				border={false}
				pagination={false}
			/>
			<Typography.Text
				type="secondary"
				className={'data-statistic-list-tip'}
			>
				轮播次数
				{data.length}， 节目单观众不可见
			</Typography.Text>
		</div>
	);
}
