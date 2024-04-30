import React, { useEffect } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import BaseRouter from '@router/index';
import { ThemeMode } from './common/enums/theme';
import { StorageConst } from './common/constant/storage';
import { HoxRoot } from 'hox';
import ErrorBoundary from './components/exceptional/ErrorBoundary';

const App = (): React.ReactElement => {
	useEffect(() => {
		document.body.setAttribute(
			'arco-theme',
			localStorage.getItem(StorageConst.ARCO_THEME) || ThemeMode.LIGHT
		);
	}, []);

	return (
		<ConfigProvider>
			<HoxRoot>
				<ErrorBoundary>
					<BaseRouter></BaseRouter>
				</ErrorBoundary>
			</HoxRoot>
		</ConfigProvider>
	);
};

export default App;
