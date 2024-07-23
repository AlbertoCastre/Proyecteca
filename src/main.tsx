import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="57061430006-pdve1kn6n8iv4uhjbmh7leh1mkp5n1is.apps.googleusercontent.com">
      <UserProvider>
        <App/>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
