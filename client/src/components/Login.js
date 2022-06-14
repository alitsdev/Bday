import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({setUserId}) => {
const navigate = useNavigate()

   const onSubmitHandler = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value
    if (userId) {
        setUserId(userId)
    }
    navigate(`/${userId}/template`)
   }

  return (
    <div>
    <div id = 'bday'>Bday.</div>
      <form className='login-form' onSubmit={onSubmitHandler}>
        <label>User Id</label>
        <input type='text' name='userId' placeholder='user Id' />
        <label>Password</label>
        <input type='text' name='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
export default Login;
