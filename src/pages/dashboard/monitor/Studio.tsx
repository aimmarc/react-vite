import { Card, Typography, Avatar, Space, Grid } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import React from 'react';
import './index.less';

export default function Studio(): React.ReactNode {
	return (
		<Card>
			<Grid.Row>
				<Grid.Col span={16}>
					<Typography.Title
						style={{ marginTop: 0, marginBottom: 16 }}
						heading={6}
					>
						直播预览
					</Typography.Title>
				</Grid.Col>
				<Grid.Col span={8} style={{ textAlign: 'right' }}>
					<IconMore />
				</Grid.Col>
			</Grid.Row>
			<div className="studio-wrapper">
				<img
					src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
					className="studio-preview"
				/>
				<div className="studio-bar">
					<div>
						<Space size={12}>
							<Avatar size={24}>
								{/* <img src={userInfo.avatar} /> */}
							</Avatar>
							<Typography.Text>我的 直播间</Typography.Text>
						</Space>
					</div>
					<Typography.Text type="secondary">
						3,6000 在看
					</Typography.Text>
				</div>
			</div>
		</Card>
	);
}
