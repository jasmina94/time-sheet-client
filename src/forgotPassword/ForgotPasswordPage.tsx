import '../assets/css/Styles.css'
import MainLogo from '../components/shared/MainLogo';
import { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { userService } from '../services/userService';

const ForgotPasswordPage = () => {
	let history = useHistory();
	
	const emailInput = useRef<HTMLInputElement>(null);
	const [error, setError] = useState('');

	const handleResetPassword = (e: any) => {
		e.preventDefault();
		const _email = emailInput.current?.value;

		if (_email && _email !== '') {
			userService.resetPassword(_email)
				.then(response => {
					if (!response.success) {
						setError(response.error);
					} else {
						alert(`Your password is reset to ${response.data}. Please update password after first login.`);
						setError('');
						history.push('/login');
					}
				});
		} else {
			setError('Email is required field!');
		}
	}

	return (
		<div className="wrapper centered">
			<MainLogo altImg="Login" clickHandler={() => history.push('/')}/>
			<div className="centered-content-wrap">
				<div className="centered-block">
					<h1>Reset password</h1>
					<ul>
						<li>
							<input type="text" placeholder="Email" className="in-text large" ref={emailInput} onChange={() => setError('')}/>
						</li>
						<li>
							<label className="error-label">{error}</label>
						</li>
						<li className="right">
							<a href=" " className="btn blue" onClick={handleResetPassword}>Reset password</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ForgotPasswordPage;