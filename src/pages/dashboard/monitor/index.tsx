import React from 'react';
import './index.less';
import { Space } from '@arco-design/web-react';
import Studio from './Studio';
import ChatPanel from './ChatPanel';
import StudioStatus from './StudioStatus';
import QuickOperation from './QuickOperation';
import StudioInformation from './StudioInformation';
import DataStatistic from './DataStatistic';

const Monitor: React.FC = () => {
	return (
		<div className="monitor-wrap">
			<div className="monitor-wrap-left-side">
				<ChatPanel />
			</div>
			<div className="monitor-wrap-content">
				<Space size={16} direction="vertical" style={{ width: '100%' }}>
					<Studio />
					<DataStatistic />
				</Space>
			</div>
			<div className="monitor-wrap-right-side">
				<Space size={16} direction="vertical" style={{ width: '100%' }}>
					<StudioStatus />
					<QuickOperation />
					<StudioInformation />
				</Space>
			</div>
		</div>
	);
};

export default Monitor;
