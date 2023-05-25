const registerUser = (user) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: 1,
				name: user.name,
				email: user.email,
				password: user.password,
			});
		}, 1000); // tempo de espera simulado
	});
};

export default registerUser;
