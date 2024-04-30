import { Button, Card, Radio, Tabs } from '@arco-design/web-react';
import React from 'react';
import './index.less';
import DataStatisticList from './DataStatisticList';

export default function DataStatistic(): React.ReactNode {
	return (
		<Card>
			<Tabs defaultActiveTab="liveMethod">
				<Tabs.TabPane
					key="liveMethod"
					title='直播方式'
				/>
				<Tabs.TabPane
					key="onlineUsers"
					title='在线人数'
				/>
			</Tabs>
			<div className="data-statistic-content">
				<Radio.Group defaultValue="3" type="button">
					<Radio value="1">普通直播</Radio>
					<Radio value="2">
						控流直播
					</Radio>
					<Radio value="3">视频直播</Radio>
					<Radio value="4">网页直播</Radio>
				</Radio.Group>

				<div className="data-statistic-list-wrapper">
					<div className="data-statistic-list-header">
						<Button type="text">编辑轮播</Button>
						<Button disabled>开始轮播</Button>
					</div>
					<div className="data-statistic-list-content">
						<DataStatisticList />
					</div>
				</div>
			</div>
		</Card>
	);
}
