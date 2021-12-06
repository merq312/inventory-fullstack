import StoreTable from './store-table';
import { Box, Grid } from '@mui/material';
import MenuTable from './menu-table';
import StoreMenuTable from './store-menu-table';
import { useEffect, useState } from 'react';
import {
  addMenuItemToStore,
  createNewMenuItem,
  getAllMenuItems,
  getAllStores,
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

  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newStoreItemName, setNewStoreItemName] = useState('');
  const [newStoreItemPrice, setNewStoreItemPrice] = useState('');
  const [newItemError, setNewItemError] = useState(false);

  useEffect(() => {
    if (newMenuItemName) {
      createNewMenuItem(newMenuItemName)
        .then(() => {
          getAllMenuItems().then(setMenuData);
          setNewItemError(false);
          setNewMenuItemName('');
        })
        .catch(() => {
          setNewItemError(true);
        });
    }
  }, [newMenuItemName]);

  useEffect(() => {
    if (newStoreItemPrice) {
      addMenuItemToStore(newStoreItemName, parseFloat(newStoreItemPrice))
        .then(() => {
          getAllStores().then(setStoreData);
        })
        .catch(() => {
          setNewItemError(true);
        });
    }
  }, [newStoreItemName, newStoreItemPrice]);

  useEffect(() => {
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
    if (selectedStore) {
      setSelectedStoreData(
        storeData.filter((store) => store.name === selectedStore)[0]
      );
    }
  }, [selectedStore, storeData]);

  useEffect(() => {
    getAllStores().then(setStoreData).catch(console.log);
    getAllMenuItems().then(setMenuData).catch(console.log);
  }, []);

  return (
    <Box sx={{ my: 2, mx: 0.4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <StoreTable
            data={storeData}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
          />
        </Grid>
        <Grid item xs={6}>
          <StoreMenuTable
            storeData={selectedStoreData}
            newStoreItemName={newStoreItemName}
            setNewStoreItemName={setNewStoreItemName}
            setNewStoreItemPrice={setNewStoreItemPrice}
          />
        </Grid>
        <Grid item xs={3}>
          <MenuTable
            menuData={menuData}
            setNewMenuItemName={setNewMenuItemName}
            setNewStoreItemName={setNewStoreItemName}
            newItemError={newItemError}
            selectedStore={selectedStore}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
