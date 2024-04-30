import { Card, Typography, Form, Input, Button } from '@arco-design/web-react';
import React from 'react';

export default function StudioInformation(): React.ReactNode {
	return (
		<Card>
			<Typography.Title
				style={{ marginTop: 0, marginBottom: 16 }}
				heading={6}
			>
				直播信息
			</Typography.Title>
			<Form layout="vertical">
				<Form.Item label="直播标题" required>
					<Input placeholder={`王立群的直播间`} />
				</Form.Item>
				<Form.Item label="上线通知" required>
					<Input.TextArea />
				</Form.Item>
				<Form.Item label="直播类目" required>
					<Input.Search />
				</Form.Item>
				<Form.Item label="直播类目" required>
					<Input.Search />
				</Form.Item>
			</Form>
			<Button type="primary">更新</Button>
		</Card>
	);
}
