import '../assets/css/Styles.css';
import MainLogo from '../components/MainLogo';
import ActionLink from '../components/ActionLink';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';

const LoginPage = () => {
	let history = useHistory();

	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const [rememberMe, setRememberMe] = useState(false);
	const [errorText, setError] = useState('');

	const passwordChange = () => { history.push('/forgotPassword'); }

	const login = () => {
		const _email = emailInput.current?.value;
		const _password = passwordInput.current?.value;

		if (_email !== undefined && _email !== ''
			&& _password !== undefined && _password !== '') {

			authenticationService.login(_email, _password, rememberMe)
				.then(response => {
					if (!response.success) {
						setError(response.error);
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
			<MainLogo altImg="Login" clickHandler={() => history.push('/')} />
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
							<label className="in-label ml-1">Remember me</label>
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