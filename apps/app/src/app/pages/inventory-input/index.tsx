import { Box, Typography } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import LogOutButton from '../../features/logout-button/logout-button';
import LogInButton from '../../features/login-button/login-button';
import DatePicker from '../../features/date-picker/date-picker';
import InventoryInfoHeader from '../inventory-info/header';
import InventoryInfo from '../inventory-info/card';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import InventoryInput from './card';

function InventoryInputPage() {
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
        Authorization: `Bearer ${token}`
      }
    })
      .then((r) => r.json())
      .then(setMessage);
  }, [token]);

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Inventory View
      </Typography>
      <ItemSearch />
      <Typography variant='body1' component='div' gutterBottom>
        {m.message}
      </Typography>
      {isLoading ? (
        <Typography variant='body1' component='div' gutterBottom>
          Loading ...
        </Typography>
      ) : isAuthenticated ? (
        <>
          <Typography variant='h5' component='h2' gutterBottom>
            {user ? user.name : ''}
          </Typography>
          <Typography variant='body1' component='div' gutterBottom>
            {user ? user.email : ''}
          </Typography>
          <LogOutButton />
        </>
      ) : (
        <LogInButton />
      )}
      <Box>
        <DatePicker />
        <InventoryInput />
        <InventoryInfoHeader />
        <InventoryInfo />
      </Box>
    </Box>
  );
}

export default InventoryInputPage;
