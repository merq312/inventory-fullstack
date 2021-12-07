import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function HomePage() {
  const [m, setMessage] = useState({ message: '' });
  const [token, setToken] = useState('');

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    getAccessTokenSilently().then(setToken);
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
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: 'center' }}
          gutterBottom
        >
          Product Tracker
        </Typography>
      </Box>
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
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </Box>
  );
}

export default HomePage;
