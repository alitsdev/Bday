const BASE_URL = 'http://localhost:3001';

type template = {
	host: string;
	strickers: any[];
	name: string;
	age: number;
	date: Date;
	time: string;
	address: string;
};
type guest = {
	name: string;
	mail: string;
	host: string;
	invitationSent: boolean;
	confirmerd: boolean;
};
type user = {
	userId: string;
	name: string;
	email: string;
	password: string;
};

export const getTemplate = async (userId = '11') => {
	await getRequest(`${userId}/template`);
};
export const getGuests = async (userId: string) => {
	await getRequest(`${userId}/guests`);
};
export const getUser = (userId: string) => {
	getRequest(`${userId}`);
};

export const postTemplate = async (userId: string, template: template) => {
	await postRequest(`${userId}/template`, template);
};
export const postGuest = async (userId: string, guest: guest) => {
	await postRequest(`${userId}/guests`, guest);
};
export const postUser = (newUser: user) => {
	postRequest('register', newUser);
};

const getRequest = async (url: string) => {
	try {
		const result = await fetch(`${BASE_URL}/${url}`);
		return await result.json();
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
