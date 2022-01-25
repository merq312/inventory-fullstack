import StoreTable from './StoreTable';
import MenuTable from './MenuTable';
import StoreMenuTable from './StoreMenuTable';
import { Box, Grid } from '@mui/material';
import Alert from '../../components/Alert';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

export default function Dashboard() {
  const { isAuthenticated } = useAuth0();
  const [alert, setAlert] = useState(false);

  const callIfAuthenticated = (callbackFn: () => void) => () => {
    if (process.env.NODE_ENV === 'development') {
      callbackFn();
    } else {
      if (isAuthenticated) {
        callbackFn();
      } else {
        setAlert(true);
      }
    }
  };

  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StoreTable callIfAuthenticated={callIfAuthenticated} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreMenuTable callIfAuthenticated={callIfAuthenticated} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable callIfAuthenticated={callIfAuthenticated} />
        </Grid>
      </Grid>
      <Alert
        open={alert}
        setOpen={setAlert}
        alertDialog={'Please login to make changes.'}
      />
    </Box>
  );
}
