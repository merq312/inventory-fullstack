import { useCallback, useEffect, useState } from 'react';
import StoreTable from './StoreTable';
import { Box, Grid } from '@mui/material';
import MenuTable from './MenuTable';
import StoreMenuTable from './StoreMenuTable';
import {
  addMenuItemToStore,
  changeMenuItemName,
  createNewMenuItem,
  getAllMenuItems,
  getAllStoresWithMenu,
} from '../../utils/api';
import { MenuItemData, StoreData } from './types';

function Dashboard() {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [selectedStoreData, setSelectedStoreData] = useState<StoreData>({
    menuItems: [],
  });
  const [menuData, setMenuData] = useState<Array<MenuItemData>>([]);
  const [storeData, setStoreData] = useState<Array<StoreData>>([]);

  const [menuLoadError, setMenuLoadError] = useState('');
  const [storeLoadError, setStoreLoadError] = useState('');

  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newStoreItemName, setNewStoreItemName] = useState('');
  const [newStoreItemPrice, setNewStoreItemPrice] = useState('');
  const [newMenuItemError, setNewMenuItemError] = useState(false);
  const [newStoreItemError, setNewStoreItemError] = useState(false);

  const [renameInput, setRenameInput] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameError, setRenameError] = useState(false);

  const setInStoreOnMenuData = useCallback(() => {
    setMenuData((menuData) =>
      menuData.map((i) => {
        let inStore = false;
        for (const j of selectedStoreData.menuItems) {
          if (i.name === j.menuItem.name) {
            inStore = true;
            break;
          }
        }
        return { ...i, inStore: inStore };
      })
    );
  }, [selectedStoreData]);

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
  }, [renameInput, renameValue, setInStoreOnMenuData]);

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
  }, [newMenuItemName, setInStoreOnMenuData]);

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
  }, [newStoreItemName, newStoreItemPrice, selectedStore]);

  useEffect(() => {
    setInStoreOnMenuData();
  }, [selectedStoreData, setInStoreOnMenuData]);

  useEffect(() => {
    if (selectedStore) {
      setSelectedStoreData(
        storeData.filter((store) => store.name === selectedStore)[0]
      );
    }
  }, [selectedStore, storeData]);

  useEffect(() => {
    getAllStoresWithMenu()
      .then(setStoreData)
      .catch((err) => setStoreLoadError(err.message));
    getAllMenuItems()
      .then(setMenuData)
      .catch((err) => setMenuLoadError(err.message));
  }, []);

  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StoreTable
            storeData={storeData}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            errorMsg={storeLoadError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StoreMenuTable
            storeData={selectedStoreData}
            newStoreItemName={newStoreItemName}
            setNewStoreItemName={setNewStoreItemName}
            setNewStoreItemPrice={setNewStoreItemPrice}
            newItemError={newStoreItemError}
            setNewItemError={setNewStoreItemError}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <MenuTable
            menuData={menuData}
            setNewMenuItemName={setNewMenuItemName}
            setNewStoreItemName={setNewStoreItemName}
            selectedStore={selectedStore}
            newItemError={newMenuItemError}
            setNewItemError={setNewMenuItemError}
            errorMsg={menuLoadError}
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
