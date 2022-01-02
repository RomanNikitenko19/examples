import React, { useContext } from 'react';
import { AuthContext } from '../context';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', true);
  }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="enter login" />
        <MyInput type="password" placeholder="enter password" />
        <MyButton >enter</MyButton>
      </form>
    </div>
  );
};

export default Login;