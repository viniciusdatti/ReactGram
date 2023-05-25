import './Auth.css';

// components
import { Link } from 'react-router-dom';

// hooks
import { useState, useEffect } from "react";
import registerUser from "../../mock/Mock";


const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [registeredUser, setRegisteredUser] = useState(null);


	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = {
			name,
			email,
			password,
		}
		try {
			// Verificar se o email já está cadastrado
			const response = await fetch(`http://localhost:3000/Users?email=${email}`)
			const data = await response.json()

			if (data.length > 0) {
				// O email já está cadastrado
				alert('Este email já está cadastrado. Por favor, utilize outro email.')
				return
			}
		} catch (error) {
			console.log(error)
		}

		try {
			const registeredUser = await registerUser(user);
			setRegisteredUser(registeredUser);
		} catch (error) {
			console.log(error)
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		}
		try {
			const response = await fetch('http://localhost:3000/Users', options)
			await response.json();
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (registeredUser) {
			console.log('Registered User:', registeredUser)
		}
	}, [registeredUser])

	return (
		<div id="register">
			<h2>Register</h2>
			<p className="subtitle">Cadastre-se para ver a foto dos seus amigos.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					onChange={(e) => setName(e.target.value)}
					value={name || ''}
				/>
				<input
					type="email"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email || ''}
				/>
				<input
					type="password"
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
					value={password || ''}
				/>
				<input
					type="password"
					placeholder="Confirme a senha"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword || ''}
				/>
				<input type="submit" value="Cadastrar"/>
			</form>
			<p>Já tem conta? <Link to="/login">Clique aqui</Link></p>
		</div>
	);
};

export default Register;
