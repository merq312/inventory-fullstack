import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth0 } from '@auth0/auth0-react';

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export const App = () => {
  const [m, setMessage] = useState({ message: '' });
  const [token, setToken] = useState('');

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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory View
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {m.message}
        </Typography>
        {isLoading ? (
          <div>Loading ...</div>
        ) : isAuthenticated ? (
          <>
            <h2>{user ? user.name : ''}</h2>
            <p>{user ? user.email : ''}</p>
            <LogOutButton />
          </>
        ) : (
          <LogInButton />
        )}
      </Box>
    </Container>
  );
};

export default App;
