import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './features/header/header';
import SettingsDrawer from './features/settings-drawer/settiings-drawer';
import InventoryInputPage from './pages/inventory-input';
import InventoryInfoPage from './pages/inventory-info';

export const App = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <Container maxWidth='sm' sx={{ p: 0, minHeight: '100vh' }}>
      <SettingsDrawer drawer={drawer} setDrawer={setDrawer} />
      <Header setDrawer={setDrawer} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Hello World</h1>} />
          <Route path='/inventory-input' element={<InventoryInputPage />} />
          <Route path='/inventory-info' element={<InventoryInfoPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
