import React from 'react';
import useAuth from './hooks/useAuth';
import AuthRouter from './routers/AuthRouter';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div id='app'>
      <AuthRouter/>
    </div>
  );
}

export default App;
