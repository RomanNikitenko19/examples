import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from '../../../context';
import { privateRoutes, publicRoutes } from "../../../router/index";
import MyLoader from '../Loader/MyLoader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)

  if (isLoading) {
    <MyLoader/>
  }

  return isAuth ? (
    <Switch>
      {privateRoutes.map((route) => (
        <Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
      ))}

      <Redirect to="/posts" />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route key={route.path} component={route.component} path={route.path} exact={route.exact} />
      ))}

      <Redirect to="/login" />
    </Switch>
  );
};

export default AppRouter;