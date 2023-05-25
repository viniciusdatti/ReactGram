import "./Publish.css";

// components
import Message from "../../components/Message";

// hooks
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";

const Profile = () => {

	const [title, setTitle] = useState();
	const [editTitle, setEditTitle] = useState();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch("http://localhost:3000/Users");
			const users = await response.json();
			const userNames = users.map(user => user.name);
			setUsers(userNames);
		};
		fetchUsers();
	}, []);

	const {
		error: errorPhoto,
		message: messagePhoto,
	} = useSelector((state) => state.photo);

	const user = useSelector((state) => state.auth.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const title = formData.get("title");
		const imageUrl = formData.get("image");

		const randomUserName = users[Math.floor(Math.random() * users.length)]
		const newPublish = {
			id: Date.now(),
			author: randomUserName,
			profilePic: user.profilePic,
			title,
			image: imageUrl,
			likes: 0,
			comments: [],
		};

		const response = await fetch("http://localhost:3000/Publish", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPublish),
		});

		if (response.ok) {
			form.reset();
		}
	};

	return (
		<div id="profile">
			<div className="new-photo">
				<h3>Publique uma foto:</h3>
				<form onSubmit={handleSubmit}>
					<label>
						<span className="input-span">Título da foto:</span>
						<input
							className="input-publish"
							type="text"
							placeholder="Insira um título"
							name="title"
							onChange={(e) => setTitle(e.target.value)}
							value={title || ""}
						/>
					</label>
					<label>
						<span className="input-span">Imagem:</span>
						<input
							className="input-publish"
							type="url"
							placeholder="Insira a url da imagem"
							name="image"
						/>
					</label>
					<input type="submit" value="Postar" />
				</form>
			</div>
			<div className="edit-photo hide">
				<p>Editando:</p>
				<form>
					<input
						type="text"
						onChange={(e) => setEditTitle(e.target.value)}
						value={editTitle || ""}
					/>
					<input type="submit" value="Atualizar" />
					<button className="cancel-btn">Cancelar edição</button>
				</form>
			</div>
			{errorPhoto && <Message msg={errorPhoto} type="error" />}
			{messagePhoto && <Message msg={messagePhoto} type="success" />}
			<div className="user-photos"></div>
		</div>
	);
};

export default Profile;