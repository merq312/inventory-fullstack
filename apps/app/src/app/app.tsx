import { createContext, useState } from 'react';
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
  fontWeight: 'normal',
};

theme.palette.primary = {
  light: '#e3f2fd',
  main: '#1976d2',
  dark: '#1565c0',
  contrastText: '#fff',
};

export interface IStoreContext {
  storeName: string;
  setStoreName?: (arg0: string) => void;
}

const defaultState: IStoreContext = {
  storeName: '',
};
export const StoreContext = createContext<IStoreContext>(defaultState);

export const App = () => {
  const [drawer, setDrawer] = useState(false);
  const [storeName, setStoreName] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreContext.Provider
          value={{ storeName: storeName, setStoreName: setStoreName }}
        >
          <PageContainer>
            <Header setDrawer={setDrawer} />
            <Main>
              <SettingsDrawer drawer={drawer} setDrawer={setDrawer} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/inventory-input"
                  element={<InventoryInputPage />}
                />
                <Route path="/inventory-info" element={<InventoryInfoPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </Main>
          </PageContainer>
        </StoreContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
