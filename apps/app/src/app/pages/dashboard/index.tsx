import StoreTable from './store-table';
import { Box, Grid } from '@mui/material';
import MenuTable from './menu-table';
import StoreMenuTable from './store-menu-table';
import { useEffect, useState } from 'react';
import {
  createNewMenuItem,
  getAllMenuItems,
  getAllStores,
} from '../../utils/get-data';

export type StoreData = {
  id: number;
  name: string;
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
};

function DashboardPage() {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [storeData, setStoreData] = useState<Array<StoreData>>([]);
  const [menuData, setMenuData] = useState<Array<MenuItemData>>([]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemError, setNewItemError] = useState(false);

  useEffect(() => {
    if (newItemName) {
      createNewMenuItem(newItemName)
        .then(() => {
          getAllMenuItems().then(setMenuData);
          setNewItemError(false);
        })
        .catch(() => {
          setNewItemError(true);
        });
    }
  }, [newItemName]);

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
            data={storeData.filter((store) => store.name === selectedStore)[0]}
          />
        </Grid>
        <Grid item xs={3}>
          <MenuTable
            data={menuData}
            setNewItemName={setNewItemName}
            newItemError={newItemError}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
