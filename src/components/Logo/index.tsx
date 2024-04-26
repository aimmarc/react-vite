import React from 'react';
import './index.less';

const Logo: React.FC<{
	onClick?: () => void;
}> = (props) => {
	return (
		<div className="logo" onClick={props.onClick}>
			<img src="/vite.svg" alt="" />
			<h1>
				<span className="react">React</span>{' '}
				<span className="vite">Vite</span>{' '}
				<span className="demo">Demo</span>
			</h1>
		</div>
	);
};

export default Logo;
