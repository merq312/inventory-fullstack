import StoreTable from './store-table';
import { Box, Grid } from '@mui/material';
import MenuTable from './menu-table';
import StoreMenuTable from './store-menu-table';
import { useCallback, useEffect, useState } from 'react';
import {
  addMenuItemToStore,
  createNewMenuItem,
  getAllMenuItems,
  getAllStoresWithMenu,
} from '../../utils/api-utils';

export type StoreData = {
  id?: number;
  name?: string;
  menuItems: Array<{
    id: number;
    price: number;
    menuItem: {
      name: string;
    };
  }>;
};

export type MenuItemData = {
  id: number;
  name: string;
  inStore?: boolean;
};

function DashboardPage() {
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
  const [newItemError, setNewItemError] = useState(false);

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
    if (newMenuItemName) {
      setNewMenuItemName('');

      createNewMenuItem(newMenuItemName)
        .then(() => {
          getAllMenuItems()
            .then(setMenuData)
            .then(setInStoreOnMenuData)
            .then(() => setNewItemError(false));
        })
        .catch(() => {
          setNewItemError(true);
        });
    }
  }, [newMenuItemName, setInStoreOnMenuData]);

  useEffect(() => {
    if (newStoreItemPrice) {
      addMenuItemToStore(newStoreItemName, parseFloat(newStoreItemPrice))
        .then(() => {
          getAllStoresWithMenu()
            .then(setStoreData)
            .then(() => setNewItemError(false));
        })
        .catch(() => {
          setNewItemError(true);
        });
    }
  }, [newStoreItemName, newStoreItemPrice]);

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
        <Grid item xs={3}>
          <StoreTable
            storeData={storeData}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            errorMsg={storeLoadError}
          />
        </Grid>
        <Grid item xs={6}>
          <StoreMenuTable
            storeData={selectedStoreData}
            newStoreItemName={newStoreItemName}
            setNewStoreItemName={setNewStoreItemName}
            setNewStoreItemPrice={setNewStoreItemPrice}
            newItemError={newItemError}
          />
        </Grid>
        <Grid item xs={3}>
          <MenuTable
            menuData={menuData}
            setNewMenuItemName={setNewMenuItemName}
            setNewStoreItemName={setNewStoreItemName}
            selectedStore={selectedStore}
            newItemError={newItemError}
            errorMsg={menuLoadError}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
