import React from 'react';
import {
	Space,
	Select,
	Input,
	Button,
	Typography,
	Spin,
} from '@arco-design/web-react';
import { IconDownload, IconFaceSmileFill } from '@arco-design/web-react/icon';
// import MessageList from './message-list';
import './index.less';
import MessageList from './MessageList';
import { useRequest } from 'ahooks';
import { listMessage } from '@/services/list';

export default function ChatPanel(): React.ReactNode {
	const { data: messageList, loading } = useRequest(listMessage);

	return (
		<div className={'chat-panel'}>
			<div className={'chat-panel-header'}>
				<Typography.Title
					style={{ marginTop: 0, marginBottom: 16 }}
					heading={6}
				>
					聊天窗口
				</Typography.Title>
				<Space size={8}>
					<Select style={{ width: 80 }} defaultValue="all">
						<Select.Option value="all">全部</Select.Option>
					</Select>
					<Input.Search placeholder="搜索类目" />
					<Button type="text" iconOnly>
						<IconDownload />
					</Button>
				</Space>
			</div>
			<div className={'chat-panel-content'}>
				<Spin loading={loading} style={{ width: '100%' }}>
					<MessageList data={messageList || []} />
				</Spin>
			</div>
			<div className={'chat-panel-footer'}>
				<Space size={8}>
					<Input suffix={<IconFaceSmileFill />} />
					<Button type="primary">更新</Button>
				</Space>
			</div>
		</div>
	);
}
