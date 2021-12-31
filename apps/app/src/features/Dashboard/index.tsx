import { useContext, useEffect, useState } from 'react';
import StoreTable from './StoreTable';
import { Box, Grid } from '@mui/material';
import MenuTable from './MenuTable';
import StoreMenuTable from './StoreMenuTable';
import { DashboardContext } from '../../providers';
import { addMenuItemToStore, getAllStoresWithMenu } from '../../utils/api';
import { setStoreData } from '../../hooks/useDashboard';

function Dashboard() {
  const {
    state: { selectedStore },
    dispatch,
  } = useContext(DashboardContext);

  const [newStoreItemName, setNewStoreItemName] = useState('');
  const [newStoreItemPrice, setNewStoreItemPrice] = useState('');
  const [newStoreItemError, setNewStoreItemError] = useState(false);

  useEffect(() => {
    const price = parseFloat(newStoreItemPrice);

    if (newStoreItemName && price) {
      setNewStoreItemPrice('');

      addMenuItemToStore(selectedStore, newStoreItemName, price)
        .then(() => getAllStoresWithMenu())
        .then((data) => dispatch(setStoreData(data)))
        .then(() => setNewStoreItemError(false))
        .catch(() => setNewStoreItemError(true));
    } else if (newStoreItemPrice && newStoreItemPrice !== '') {
      setNewStoreItemError(true);
    }
  }, [dispatch, newStoreItemName, newStoreItemPrice, selectedStore]);

  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StoreTable />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreMenuTable
            newStoreItemName={newStoreItemName}
            setNewStoreItemName={setNewStoreItemName}
            setNewStoreItemPrice={setNewStoreItemPrice}
            newStoreItemError={newStoreItemError}
            setNewStoreItemError={setNewStoreItemError}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable setNewStoreItemName={setNewStoreItemName} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;

// FIXME: Instead of "setMenuData" and "setStoreData", use FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE for each
// TODO: Move the remaining input/value/error states and the useEffects into table components
