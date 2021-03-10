const getUser = () => {
	if (localStorage.getItem("2048-user")) {
		return JSON.parse(localStorage.getItem("2048-user")!);
	}
	return null;
};

export default getUser;
