import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.style.css';

type LoginProps = {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
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
    </div>
  );
};
export default Login;
