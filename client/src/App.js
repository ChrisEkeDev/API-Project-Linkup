import React from 'react';
import useAuth from './hooks/useAuth';
import AppRouter from './routers/AppRouter';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div id='app'>
      <AppRouter/>
    </div>
  );
}

export default App;
