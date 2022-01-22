import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Landing = () => {
  const [m, setMessage] = useState({ message: '' });
  const [token, setToken] = useState('');

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const theme = useTheme();

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
          data-cy="homepage-title"
          gutterBottom
        >
          Bento Sushi Product Tracker
        </Typography>
      </Box>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center' },
          mb: 3,
          '& > *': {
            p: 2,
            m: 1,
            color: theme.palette.primary.main,
          },
        }}
      >
        <Link to="Dashboard">Dashboard</Link>
        <Link to="inventory-input">Inventory Input</Link>
        <Link to="inventory-info">Inventory Information</Link>
      </Paper>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            py: 2,
            px: 4,
            m: 1,
          },
        }}
      >
        {/*<Typography variant="body1" component="div" gutterBottom>*/}
        {/*  {m.message}*/}
        {/*</Typography>*/}
        {isLoading ? (
          <Typography variant="body1" component="div" gutterBottom>
            Loading ...
          </Typography>
        ) : isAuthenticated ? (
          <>
            <Typography variant="h5" component="h2">
              {user ? user.name : ''}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              {user ? user.email : ''}
            </Typography>
          </>
        ) : (
          <p>You are not logged in</p>
        )}
      </Paper>
    </Box>
  );
};

export default Landing;
