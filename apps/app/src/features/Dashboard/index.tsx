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

  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StoreTable setAlert={setAlert} isAuthenticated={isAuthenticated} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreMenuTable
            setAlert={setAlert}
            isAuthenticated={isAuthenticated}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable setAlert={setAlert} isAuthenticated={isAuthenticated} />
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
