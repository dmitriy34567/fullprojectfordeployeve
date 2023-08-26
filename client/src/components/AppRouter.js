import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {REGISTRATION_ROUTE, NOT_FOUND} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useHistory } from 'react-router-dom';


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory();

    // Перевірка наявності токена в localStorage
    const token = localStorage.getItem('token');
  
    // Якщо токен відсутній і користувач не авторизований
    // Можна зробити перенаправлення на сторінку авторизації
    if (!token && !user.isAuth) {
      
        history.push(REGISTRATION_ROUTE);
    }
    console.log(user)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={NOT_FOUND}/>
        </Switch>
    );
});

export default AppRouter;
