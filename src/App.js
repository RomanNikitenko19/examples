import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "./context";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from './components/UI/AppRouter/AppRouter';
import "./style/App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    //setIsAuth(false)//default!!!
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
