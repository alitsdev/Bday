const BASE_URL = 'http://localhost:3001/';

export const getTemplate = (userId) => getRequest(`${userId}/template`);
export const getGuests = (userId) => getRequest(`${userId}/guests`);
export const getUser = (userId) => getRequest(`${userId}`);

export const postTemplate = (userId, template) => postRequest(`${userId}/template`, template)
export const postGuest = (userId, guest) => postRequest(`${userId}/guests`, guest)
export const postUser = (newUser) => postGuest('register', newUser)

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
        body: JSON.stringify(item)
      });
    return await result.json();
  } catch (error) {
    console.log(error);
  }
};
