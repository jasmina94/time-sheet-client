import '../assets/css/Styles.css';
import ActionLink from '../components/ActionLink';
import MainLogo from '../components/MainLogo';
import { useEffect, useRef, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';

const LoginPage = () => {
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	//TODO: Redirect to new page
	const passwordChange = () => {
		alert('You requested password change!');
	}

	const login = () => {
		const _email = emailInput.current?.value;
		const _password = passwordInput.current?.value;
		
		if (_email !== undefined && _password !== undefined) {
			authenticationService.login(_email, _password);
		}
	}

	return (
		<div className="wrapper centered">
			<MainLogo altImg="Login" />
			<div className="centered-content-wrap">
				<div className="centered-block">
					<h1>Login</h1>
					<ul>
						<li>
							<input type="text" placeholder="Email" className="in-text large" ref={emailInput} />
						</li>
						<li>
							<input type="password" placeholder="Password" className="in-pass large" ref={passwordInput} />
						</li>
						<li className="last">
							<input type="checkbox" className="in-checkbox" id="remember" />
							<label className="in-label">Remember me</label>
							<span className="right">
								<ActionLink content="Forgot password?" action={passwordChange}></ActionLink>
								<button className="btn blue" onClick={login}>Login</button>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default LoginPage;