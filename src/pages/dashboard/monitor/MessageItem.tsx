import React from 'react';
import { Space, Typography } from '@arco-design/web-react';
import { IconCommand, IconStar } from '@arco-design/web-react/icon';
import cs from 'classnames';
import './MessageItem.less';

export interface Message {
	id?: string;
	username?: string;
	content?: string;
	time?: string;
	isCollect?: boolean;
}

export interface MessageItemProps {
	data: Message;
}

function MessageItem(props: MessageItemProps): React.ReactNode {
	const { data = {} } = props;
	const classNames = cs('message-item', {
		['message-item-collected']: data.isCollect,
	});

	return (
		<div className={classNames}>
			<Space size={4} direction="vertical" style={{ width: '100%' }}>
				<Typography.Text type="warning">
					{data.username}
				</Typography.Text>
				<Typography.Text>{data.content}</Typography.Text>
				<div className={'message-item-footer'}>
					<div className={'message-item-time'}>
						<Typography.Text type="secondary">
							{data.time}
						</Typography.Text>
					</div>
					<div className={'message-item-actions'}>
						<div className={'message-item-actions-item'}>
							<IconCommand />
						</div>
						<div
							className={cs(
								'message-item-actions-item',
								'message-item-actions-collect'
							)}
						>
							<IconStar />
						</div>
					</div>
				</div>
			</Space>
		</div>
	);
}

export default MessageItem;
