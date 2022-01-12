import { createContext, ReactNode, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

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
  setStoreName: (arg0: string) => void;
  drawer: boolean;
  setDrawer: (arg0: boolean) => void;
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

type AppProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProps) => {
  const [storeName, setStoreName] = useState('');
  const [drawer, setDrawer] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreContext.Provider
          value={{
            storeName: storeName,
            setStoreName: setStoreName,
            drawer: drawer,
            setDrawer: setDrawer,
          }}
        >
          {children}
        </StoreContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
