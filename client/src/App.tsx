import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { ChartView } from './pages/ChartView';
import {
  CurrentUserContext,
  CurrentUserContextType,
  CurrentUserType,
} from './context/currentUserContext';
import { Layout } from './components/Layout';
import { getCurrentUser } from './apis';

export function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUserType>({
    username: '',
    isLoggedin: false,
  });

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const responseData = await getCurrentUser();
        if (responseData.username)
          setCurrentUser({ username: responseData.username, isLoggedin: true });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    getUser();
  }, []);
  return loading ? (
    <>authenticating...</>
  ) : (
    <CurrentUserContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            {currentUser.isLoggedin ? (
              <>
                <Route path='' element={<ChartView />} />
              </>
            ) : (
              <>
                <Route path='' element={<Navigate to='/login' />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </Layout>
    </CurrentUserContext.Provider>
  );
}
//? now it doesn't work
