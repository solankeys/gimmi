const getAllDiscussion = async () => {
	const url = `${process.env.API_DEV}/wp-json/gimmi/v1/all_discussion`;
	const response = await fetch(url);
	return response.json();
};

const getAllCreators = async () => {
	const url = `${process.env.API_DEV}/wp-json/gimmi/v1/influencers`;
	const response = await fetch(url);
	return response.json();
};

const getUserFollowingList = async (email) => {
	const url = `${process.env.API_DEV}/wp-json/gimmi/v1/user_followers?email=${email}`;
	const response = await fetch(url);
	return response.json();
};

const toggleFollow = async (data) => {
	const url = `${process.env.API_DEV}/wp-json/gimmi/v1/add_follow`;
	await fetch(url, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: data,
	});
};
export { getAllDiscussion, getAllCreators, getUserFollowingList, toggleFollow };
