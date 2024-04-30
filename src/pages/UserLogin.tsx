import React, { useRef } from 'react';
import {
	Carousel,
	Form,
	Input,
	Button,
	Checkbox,
	FormInstance,
	Message,
} from '@arco-design/web-react';
import { IconUser, IconLock } from '@arco-design/web-react/icon';
import './UserLogin.less';
import Logo from '@/components/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { IUserLoginParams, userLogin } from '@/services/user';
import qs from 'qs';

const imageSrc = [
	{
		title: 'Out-of-the-box high-quality template',
		desc: 'Rich page templates, covering most typical business scenarios',
	},
	{
		title: 'Built-in solutions to common problems',
		desc: 'Internationalization, routing configuration, state management everything',
	},
	{
		title: 'Access visualization enhancement tool AUX',
		desc: 'Realize flexible block development',
	},
];

const UserLogin: React.FC = () => {
	const navigate = useNavigate();
	const formRef = useRef<FormInstance>(null);
	const loca = useLocation();

	const { run, loading } = useRequest(userLogin, {
		manual: true,
		onSuccess() {
			console.log(qs.parse(loca.search.replace('?', '')));
			const { returnPath } = qs.parse(loca.search.replace('?', ''));

			navigate((returnPath ? returnPath : '/') as string, {
				replace: true,
			});
		},
		onError(err) {
			Message.error(String(err));
		},
	});

	function handleSubmit() {
		formRef.current?.validate().then(() => {
			run(formRef.current?.getFieldsValue() as IUserLoginParams);
		});
	}

	return (
		<div className="user-login">
			<div className="fixed-logo">
				<Logo />
			</div>
			<div className="left">
				<Carousel
					animation="fade"
					style={{
						height: '100%',
						background:
							'linear-gradient(163.85deg, #1d2129, #00308f)',
					}}
				>
					{imageSrc.map((item, index) => (
						<div className="carousel-item" key={index}>
							<div className="inner">
								<h4>{item.title}</h4>
								<p>{item.desc}</p>
								<img src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png" />
							</div>
						</div>
					))}
				</Carousel>
			</div>
			<div className="login-panel">
				<div className="login-inner">
					<div className="brand">
						<Logo />
						<p>欢迎登录React Vite Demo</p>
					</div>
					<Form
						ref={formRef}
						autoComplete="off"
						wrapperCol={{ offset: 0 }}
					>
						<Form.Item field="account" rules={[{ required: true }]}>
							<Input
								placeholder="请输入用户名"
								prefix={<IconUser />}
								maxLength={20}
								name="account"
							/>
						</Form.Item>
						<Form.Item
							field="password"
							rules={[{ required: true }]}
						>
							<Input
								placeholder="请输入密码"
								prefix={<IconLock />}
								type="password"
								maxLength={20}
								name="password"
							/>
						</Form.Item>
						<Form.Item>
							<div className="remember">
								<div>
									<Checkbox>记住密码</Checkbox>
								</div>
								<a className="arco-link">忘记密码？</a>
							</div>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								style={{ width: '100%' }}
								onClick={handleSubmit}
								loading={loading}
							>
								登录
							</Button>
						</Form.Item>
						<Form.Item>
							<Button
								style={{
									width: '100%',
									color: 'var(--color-text-3)',
								}}
								type="text"
							>
								注册账号
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
