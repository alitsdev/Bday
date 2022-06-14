const BASE_URL = 'http://localhost:3001';

export const getTemplate = async (userId='alicia') => await getRequest(`${userId}/template`);
export const getGuests = async (userId) => await getRequest(`${userId}/guests`);
export const getUser = (userId) => getRequest(`${userId}`);

export const postTemplate = async (userId, template) =>
  await postRequest(`${userId}/template`, template);
export const postGuest = async (userId, guest) =>
  await postRequest(`${userId}/guests`, guest);
export const postUser = (newUser) => postGuest('register', newUser);

const getRequest = async (url) => {
  try {
    const result = await fetch(`${BASE_URL}/${url}`);
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};

const postRequest = async (url, item) => {
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
