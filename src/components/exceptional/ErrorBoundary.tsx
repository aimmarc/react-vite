import React, { PropsWithChildren } from 'react';
import './ErrorBoundary.less';

export default class ErrorBoundary extends React.Component<
	PropsWithChildren,
	{ hasError: boolean; error: Error | null; errorInfo: Record<string, any> }
> {
	state = {
		hasError: false,
		error: null,
		errorInfo: {},
	};

	static getDerivedStateFromError(error: Error) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: Record<string, any>) {
		console.log('componentDidCatch: ', error, errorInfo);
		// 你同样可以将错误日志上报给服务器
		// logErrorToMyService(error, errorInfo);
		this.setState({
			errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			// 你可以自定义降级后的 UI 并渲染
			return (
				<div className="error-boundary">
					<p>{String(this.state.error)}</p>
					<p>{JSON.stringify(this.state.errorInfo)}</p>
				</div>
			);
		}

		return this.props.children;
	}
}
