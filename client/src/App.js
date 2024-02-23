import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import { check } from './http/userAPI';
import { useActions } from './hooks/useActions';

function App() {
  const { setUser } = useActions()

  useEffect(() => {
    check().then(data => {
      let anyData = data
      setUser(anyData.login, anyData.role)
    })
  }, [])
  
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
