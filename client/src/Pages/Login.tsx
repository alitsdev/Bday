import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.style.css';
import GoogleButton from 'react-google-button';
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

type LoginProps = {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUserMail: React.Dispatch<React.SetStateAction<string>>;
};

const Login: React.FC<LoginProps> = ({ setUserId }) => {
  const navigate = useNavigate();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      userId: { value: string };
    };

    const userId: string = target.userId.value;
    if (userId) {
      setUserId(userId);
    }
    navigate(`/${userId}/template`);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const googleUserId = result.user.uid;
        setUserId(googleUserId);
        navigate(`/${googleUserId}/template`);
        console.log(result);
        //TODO - postUser with details added from the google login ( result.user.)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div id="bday">Bday.</div>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <label>User Id</label>
        <input type="text" name="userId" placeholder="user Id" />
        <label>Password</label>
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
      <GoogleButton className="googleBtn" onClick={signInWithGoogle} />
    </div>
  );
};
export default Login;
