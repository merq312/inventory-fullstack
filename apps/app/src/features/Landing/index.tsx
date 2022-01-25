import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Landing = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const theme = useTheme();

  return (
    <Box
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
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
      <Typography variant="body2" component="div" gutterBottom>
        &copy; Chamila Gunasena 2022
      </Typography>
    </Box>
  );
};

export default Landing;
