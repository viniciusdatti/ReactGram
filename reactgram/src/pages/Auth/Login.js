import "./Auth.css";

import {Link} from "react-router-dom";
import Message from "../../components/Message";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, reset} from "../../slices/authSlice";

export const getUsers = async () => {
	try {
		const response = await fetch("http://localhost:3000/Users");
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const users = await getUsers();
		const user = users.find(
			(registeredUsers) =>
				registeredUsers.email === email && registeredUsers.password === password
		);

		if (user) {
			dispatch(login(user));
		} else {
			dispatch(reset());
			alert("User not found!");
		}
	};

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

	return (
		<div id="login">
			<h2>ReactGram</h2>
			<p className="subtitle">Faça o login para ver o que há de novo.</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="E-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
				/>
				<input
					type="password"
					placeholder="Senha"
					onChange={(e) => setPassword(e.target.value)}
					value={password || ""}
				/>
				{!loading && <input type="submit" value="Entrar" />}
				{loading && <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
			</form>
			<p>
				Não tem conta? <Link to="/register"> Clique aqui</Link>
			</p>
		</div>
	);
};

export default Login;
