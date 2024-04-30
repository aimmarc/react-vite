import React from 'react';
import { Button, Card, Typography, Space } from '@arco-design/web-react';
import {
	IconArrowRight,
	IconStop,
	IconSwap,
	IconTags,
} from '@arco-design/web-react/icon';

export default function QuickOperation(): React.ReactNode {
	return (
		<Card>
			<Typography.Title
				style={{ marginTop: 0, marginBottom: 16 }}
				heading={6}
			>
				快捷操作
			</Typography.Title>
			<Space direction="vertical" style={{ width: '100%' }} size={10}>
				<Button long icon={<IconTags />}>
					切换清晰度
				</Button>
				<Button long icon={<IconSwap />}>
					主备流切换
				</Button>
				<Button long icon={<IconStop />}>
					摘除清晰度
				</Button>
				<Button long icon={<IconArrowRight />}>
					推流垫片
				</Button>
			</Space>
		</Card>
	);
}
