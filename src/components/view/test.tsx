import React, { useEffect, useState } from 'react';
import ClienteAxios from '../../config/axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    ClienteAxios.get('/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>Test Connection</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
