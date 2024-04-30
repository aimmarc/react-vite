import React from 'react';
import { Result } from '@arco-design/web-react';
import MessageItem, { Message } from './MessageItem';
import './index.less';

interface MessageListProps {
	data: Message[];
}

function MessageList(props: MessageListProps): React.ReactNode {
	const { data = [] } = props;
	return (
		<div className="message-list">
			{data.map((item) => (
				<MessageItem key={item.id} data={item} />
			))}
			{!data.length && <Result status="404" title="暂无数据" />}
		</div>
	);
}

export default MessageList;
