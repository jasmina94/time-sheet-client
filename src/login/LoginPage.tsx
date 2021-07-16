import '../assets/css/Styles.css';
import MainLogo from '../components/MainLogo';
import ActionLink from '../components/ActionLink';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticationService } from '../services/authenticationService';

const LoginPage = () => {
	let history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const [errorEmail, setErrorEmail] = useState('');
	const [errorPassword, setErrorPassword] = useState('');

	const handleForgetPassword = () => { history.push('/forgotPassword'); }

	const isFormValid = (): boolean => {
		let isValid = true;
		const emailMask = /\S+@\S+\.\S+/;
		if (email === undefined || email === '') {
			setErrorEmail('E-mail is required!');
			isValid = false;
		} else if (!emailMask.test(email)) {
			setErrorEmail('E-mail is not valid!');
			isValid = false;
		} 
		
		if (password === undefined || password === '') {
			setErrorPassword('Password is required!');
			isValid = false;
		}

		return isValid;
	}

	const login = () => {
		if (isFormValid()) {
			authenticationService.login(email, password, rememberMe)
				.then(response => {
					if (!response.success) {
						setErrorPassword(response.error);
					} else {
						history.push('/');
					}
				})
		}
	}

	const handleFormInputChange = (e: any) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
		setErrorEmail('');
		setErrorPassword('');
	}

	return (
		<div className="wrapper centered">
			<MainLogo altImg="Login" clickHandler={() => history.push('/')} />
			<div className="centered-content-wrap">
				<div className="centered-block">
					<h1>Login</h1>
					<ul>
						<li>
							<input type="text" placeholder="Email" name="email"
								className="in-text large" value={email} onChange={handleFormInputChange} />
						</li>
						<li style={{paddingTop: "-12px"}}>
							<label className="error-label">{errorEmail}</label>
						</li>
						<li>
							<input type="password" placeholder="Password" name="password"
								className="in-pass large" value={password} onChange={handleFormInputChange} />
						</li>
						<li style={{paddingTop: "-12px"}}>
							<label className="error-label">{errorPassword}</label>
						</li>
						<li className="last">
							<input type="checkbox" className="in-checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
							<label className="in-label ml-1">Remember me</label>
							<span className="right">
								<ActionLink content="Forgot password?" action={handleForgetPassword}></ActionLink>
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