import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Typography, Box } from '@mui/material';
import Header from './header/header';
import LogOutButton from './logout-button/logout-button';
import LogInButton from './login-button/login-button';
import InventoryInput from './inventory-input/inventory-input';
import InventoryInfo from './inventory-info/inventory-info';
import SettingsDrawer from './settings-drawer/settiings-drawer';

export const App = () => {
  const [m, setMessage] = useState({ message: '' });
  const [token, setToken] = useState('');
  const [drawer, setDrawer] = useState(false);

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function fetchToken() {
      const token = await getAccessTokenSilently();
      setToken(token);
    }

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('/api/v1/user/private', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then(setMessage);
  }, [token]);

  return (
    <Container maxWidth="sm" sx={{ p: 0, minHeight: '100vh' }}>
      <SettingsDrawer drawer={drawer} setDrawer={setDrawer} />
      <Header setDrawer={setDrawer} />
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory View
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {m.message}
        </Typography>
        {isLoading ? (
          <Typography variant="body1" component="div" gutterBottom>
            Loading ...
          </Typography>
        ) : isAuthenticated ? (
          <>
            <Typography variant="h5" component="h2" gutterBottom>
              {user ? user.name : ''}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              {user ? user.email : ''}
            </Typography>
            <LogOutButton />
          </>
        ) : (
          <LogInButton />
        )}
        <Box>
          <InventoryInput />
          <InventoryInfo />
        </Box>
      </Box>
    </Container>
  );
};

export default App;
