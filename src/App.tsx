import LoginPage from './pages/LoginPage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Redirect } from 'rocon/lib/react';
import Rocon, { useRoutes } from 'rocon/react';
import { getStatus } from './api/auth';
import { authState, loginState } from './stores/app';
import MainPage from './pages/MainPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootRoutes = Rocon.Path()
  .exact({ action: () => <RedirectRoot /> })
  .route('app', (route) => route.action(() => <RedirectApp />))
  .route('login', (route) => route.action(() => <RedirectLogin />));
const RootRoutesComponent = () => {
  return useRoutes(rootRoutes);
};

const RedirectRoot = () => {
  const login = useRecoilValue(loginState);
  console.log(login.status);
  return login.status === 'OK' ? (
    <Redirect route={rootRoutes._.app} />
  ) : (
    <Redirect route={rootRoutes._.login} />
  );
};
const RedirectLogin = () => {
  const setAuthState = useSetRecoilState(authState);
  const [login, setLogin] = useRecoilState(loginState);
  const goApp = (token: string, userId: string) => {
    setAuthState({ token, userId });
    setLogin({ status: 'OK' });
  };
  return login.status !== 'OK' ? (
    <LoginPage goApp={goApp} />
  ) : (
    <Redirect route={rootRoutes._.app} />
  );
};
const RedirectApp = () => {
  const login = useRecoilValue(loginState);
  return login.status === 'OK' ? (
    <MainPage />
  ) : (
    <Redirect route={rootRoutes._.login} />
  );
};

const App = () => {
  const setLoggedIn = useSetRecoilState(loginState);
  const setAuthData = useSetRecoilState(authState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      const localAuthData = await AsyncStorage.getItem('app-auth');
      if (localAuthData) {
        const parsedAuthData = JSON.parse(localAuthData);
        const res = await getStatus(
          parsedAuthData.token,
          parsedAuthData.userId,
        );
        if (res.authenticated) {
          setLoggedIn({ status: 'OK' });
          setAuthData({ token: res.user.token, userId: res.user.user_id });
          setIsLoading(false);
        } else {
          setLoggedIn({ status: 'Error', message: res });
          console.log(res);
          setIsLoading(false);
        }
      } else {
        setLoggedIn({ status: 'Error', message: 'a' });
        setIsLoading(false);
      }
    };
    f();
  }, []);
  return isLoading ? <Text>Loading</Text> : <RootRoutesComponent />;
};

export default App;
