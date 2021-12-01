import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header/header';
import SettingsDrawer from './components/settings-drawer/settiings-drawer';
import InventoryInputPage from './pages/inventory-input';
import InventoryInfoPage from './pages/inventory-info';
import HomePage from './pages/home';
import { PageContainerDiv } from './utils/styles';

export const App = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <Box sx={{ p: 0, minHeight: '100vh' }}>
      <BrowserRouter>
        <SettingsDrawer drawer={drawer} setDrawer={setDrawer} />
        <Header setDrawer={setDrawer} />
        <PageContainerDiv>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/inventory-input' element={<InventoryInputPage />} />
            <Route path='/inventory-info' element={<InventoryInfoPage />} />
          </Routes>
        </PageContainerDiv>
      </BrowserRouter>
    </Box>
  );
};

export default App;
