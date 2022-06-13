import React from 'react';

const Login = ({setUserId}) => {
   const onSubmitHandler = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value
    if (userId) {
        setUserId(userId)
    }
   }

  return (
    <div>
      <form id='details-form' onSubmit={onSubmitHandler}>
        <label>User Id</label>
        <input type='text' name='userId' placeholder='user Id' />
        <label>Password</label>
        <input type='number' name='password' placeholder='password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};
export default Login;
