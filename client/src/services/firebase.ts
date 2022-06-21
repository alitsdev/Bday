import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const userId = result.user.displayName;
			const email = result.user.email;
			const profilePic = result.user.photoURL;

			localStorage.setItem('name', userId as unknown as string);
			localStorage.setItem('email', email as unknown as string);
			localStorage.setItem('profilePic', profilePic as unknown as string);
		})
		.catch((error) => {
			console.log(error);
		});
};
