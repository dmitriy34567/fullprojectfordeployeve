import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />;
  }

  return (
    <BrowserRouter>
      {/* Умовний рендеринг для навбара */}
      <Route
        render={({ location }) => {
          if (location.pathname === '/new_profile') {
            return null; // Не рендеримо навбар на сторінці створення профілю
          } else {
            return <NavBar />;
          }
        }}
      />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
