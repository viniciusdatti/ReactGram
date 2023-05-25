import "./EditProfile.css";
import { useEffect, useState } from "react";

const EditProfile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [updateSuccess, setUpdateSuccess] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3000/Users/1")
			.then((response) => response.json())
			.then((data) => {
				setName(data.name);
				setEmail(data.email);
				setPassword(data.password);
				setBio(data.bio);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (!isFormValid()) {
			alert("Preencha todos os campos obrigatórios.");
			return;
		}

		const updatedUser = {
			name: name,
			email: email,
			password: password,
			bio: bio,
		};

		try {
			const response = await fetch("http://localhost:3000/Users/1", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedUser),
			});

			if (!response.ok) {
				throw new Error("Error updating user.");
			}

			setUpdateSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};

	const isFormValid = () => {
		return name !== "" && email !== "";
	};

	return (
		<div id="edit-profile">
			<h2>Atualize seus dados</h2>
			{updateSuccess && (
				<div className="alert success">
					Dados atualizados com sucesso!
				</div>
			)}
			<form onSubmit={handleFormSubmit}>
				<label>
					<span>Altere seu nome:</span>
					<input
						type="text"
						placeholder="Nome"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					<span>Bio:</span>
					<input
						type="text"
						placeholder="Adicione uma bio"
						onChange={(e) => setBio(e.target.value)}
					/>
				</label>
				<label>
					<span>Atualize seu e-mail:</span>
					<input
						type="email"
						placeholder="Insira seu novo e-mail"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<span>Altere sua senha:</span>
					<input
						type="password"
						placeholder="Insira sua nova senha"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<input type="submit" value="Atualizar" />
			</form>
		</div>
	);
};

export default EditProfile;
