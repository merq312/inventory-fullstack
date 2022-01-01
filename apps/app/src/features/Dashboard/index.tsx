import StoreTable from './StoreTable';
import MenuTable from './MenuTable';
import StoreMenuTable from './StoreMenuTable';
import { Box, Grid } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StoreTable />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreMenuTable />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
