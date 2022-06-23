import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBRWvlGABVrMQTuY-jTsQQfNI9WBxVwJNQ',
	authDomain: 'bday-b0e3f.firebaseapp.com',
	projectId: 'bday-b0e3f',
	storageBucket: 'bday-b0e3f.appspot.com',
	messagingSenderId: '868384526802',
	appId: '1:868384526802:web:a1666e16ca7749cb43f80b',
	measurementId: 'G-FC5VN9Q6MQ',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
