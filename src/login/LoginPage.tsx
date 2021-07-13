import '../assets/css/Styles.css';
import ActionLink from '../components/ActionLink';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MainLogo from '../components/MainLogo';
import { authenticationService } from '../services/authenticationService';

const LoginPage = () => {
	let history = useHistory();

	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const [rememberMe, setRememberMe] = useState(false);
	const [errorText, setError] = useState('');

	const passwordChange = () => {
		alert('You requested password change!');
	}

	const login = () => {
		const _email = emailInput.current?.value;
		const _password = passwordInput.current?.value;

		if (_email !== undefined && _email !== ''
			&& _password !== undefined && _password !== '') {

			authenticationService.login(_email, _password, rememberMe)
				.then(data => {
					if (!data.success) {
						setError(data.error);
					} else {
						history.push('/');
					}
				})
		} else {
			setError('Email and password are required for login!')
		}
	}

	const handleErrorText = () => { setError(''); }

	return (
		<div className="wrapper centered">
			<MainLogo altImg="Login" />
			<div className="centered-content-wrap">
				<div className="centered-block">
					<h1>Login</h1>
					<ul>
						<li>
							<input type="text" placeholder="Email" className="in-text large" ref={emailInput} onChange={handleErrorText} />
						</li>
						<li>
							<input type="password" placeholder="Password" className="in-pass large" ref={passwordInput} onChange={handleErrorText} />
						</li>
						<li>
							<label className="error-label">{errorText}</label>
						</li>
						<li className="last">
							<input type="checkbox" className="in-checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
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