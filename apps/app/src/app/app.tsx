import React, { useEffect, useState } from 'react';
import { Message } from '@inventory-fullstack/api-interfaces';
import { Button } from '@mui/material';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to app!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Extensible Build Framework"
        />
      </div>
      <Button>Click me</Button>
      <div>{m.message}</div>
    </>
  );
};

export default App;
