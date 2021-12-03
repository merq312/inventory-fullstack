import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import SettingsDrawer from './components/settings-drawer/settiings-drawer';
import InventoryInputPage from './pages/inventory-input';
import DashboardPage from './pages/dashboard';
import InventoryInfoPage from './pages/inventory-info';
import HomePage from './pages/home';
import { Main, PageContainer } from './utils/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

theme.typography.h1 = {
  fontSize: '1.4rem',
  fontWeight: 'normal'
};

export const App = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <BrowserRouter>
          <SettingsDrawer drawer={drawer} setDrawer={setDrawer} />
          <Header setDrawer={setDrawer} />
          <PageContainer>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/inventory-input' element={<InventoryInputPage />} />
              <Route path='/inventory-info' element={<InventoryInfoPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
            </Routes>
          </PageContainer>
        </BrowserRouter>
      </Main>
    </ThemeProvider>
  );
};

export default App;
