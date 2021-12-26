import { useEffect, useState } from 'react';
import StoreTable from './StoreTable';
import { Box, Grid } from '@mui/material';
import MenuTable from './MenuTable';
import StoreMenuTable from './StoreMenuTable';
import useDashboard from '../../hooks/useDashboard';
import {
  addMenuItemToStore,
  changeMenuItemName,
  createNewMenuItem,
  getAllMenuItems,
  getAllStoresWithMenu,
} from '../../utils/api';

function Dashboard() {
  const {
    state: { selectedStore, selectedStoreData },
    dispatch: { setMenuData, setStoreData, setInStoreOnMenuData },
  } = useDashboard();

  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newStoreItemName, setNewStoreItemName] = useState('');
  const [newStoreItemPrice, setNewStoreItemPrice] = useState('');
  const [newMenuItemError, setNewMenuItemError] = useState(false);
  const [newStoreItemError, setNewStoreItemError] = useState(false);

  const [renameInput, setRenameInput] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameError, setRenameError] = useState(false);

  useEffect(() => {
    setInStoreOnMenuData();
  }, [selectedStoreData, setInStoreOnMenuData]);

  useEffect(() => {
    if (renameInput && renameValue) {
      setRenameInput('');
      setRenameValue('');
      changeMenuItemName(renameInput, renameValue)
        .then(() => getAllMenuItems())
        .then(setMenuData)
        .then(setInStoreOnMenuData)
        .then(getAllStoresWithMenu)
        .then(setStoreData)
        .then(() => {
          setRenameError(false);
        })
        .catch(() => setRenameError(true));
    }
  }, [
    renameInput,
    renameValue,
    setInStoreOnMenuData,
    setMenuData,
    setStoreData,
  ]);

  useEffect(() => {
    if (newMenuItemName) {
      setNewMenuItemName('');

      createNewMenuItem(newMenuItemName)
        .then(() => getAllMenuItems())
        .then(setMenuData)
        .then(setInStoreOnMenuData)
        .then(() => setNewMenuItemError(false))
        .catch(() => setNewMenuItemError(true));
    }
  }, [newMenuItemName, setInStoreOnMenuData, setMenuData]);

  useEffect(() => {
    const price = parseFloat(newStoreItemPrice);

    if (newStoreItemName && price) {
      setNewStoreItemPrice('');

      addMenuItemToStore(selectedStore, newStoreItemName, price)
        .then(() => getAllStoresWithMenu())
        .then(setStoreData)
        .then(() => setNewStoreItemError(false))
        .catch(() => setNewStoreItemError(true));
    } else if (newStoreItemPrice && newStoreItemPrice !== '') {
      setNewStoreItemError(true);
    }
  }, [newStoreItemName, newStoreItemPrice, selectedStore, setStoreData]);

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
            newItemError={newStoreItemError}
            setNewItemError={setNewStoreItemError}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable
            setNewMenuItemName={setNewMenuItemName}
            setNewStoreItemName={setNewStoreItemName}
            newItemError={newMenuItemError}
            setNewItemError={setNewMenuItemError}
            renameInput={renameInput}
            setRenameInput={setRenameInput}
            setRenameValue={setRenameValue}
            renameError={renameError}
            setRenameError={setRenameError}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
