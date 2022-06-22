const BASE_URL = 'http://localhost:3001';

export type template = {
	host: string;
	stickers: any[];
	name: string;
	age: number;
	date: Date;
	time: string;
	address: string;
	email?: string;
};
type guest = {
	name: string;
	mail: string;
	host?: string;
	invitationSent?: boolean;
	confirmed?: boolean;
};
export type user = {
	userId: string;
	name: string;
	email: string;
	password?: string;
};

export const getTemplate = async (userId: string) => {
	console.log(userId, 'userId');
	return await getRequest(`${userId}/template`);
};
export const getGuests = async (userId: string) => {
	await getRequest(`${userId}/guests`);
};
export const getUser = async (userId: string) => {
	return await getRequest(`${userId}`);
};

export const postTemplate = async (userId: string, template: template) => {
	return await postRequest(`${userId}/template`, template);
};
export const postGuest = async (userId: string, guest: guest) => {
	return await postRequest(`${userId}/guests`, guest);
};
export const postUser = (newUser: user) => {
	return postRequest('register', newUser);
};

const getRequest = async (url: string) => {
	try {
		const result = await fetch(`${BASE_URL}/${url}`);
		const json = await result.json();
		return json;
	} catch (error) {
		console.log(error);
	}
};

const postRequest = async (url: string, item: guest | user | template) => {
	try {
		const result = await fetch(`${BASE_URL}/${url}`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(item),
		});
		return await result.json();
	} catch (error) {
		console.log(error);
	}
};
