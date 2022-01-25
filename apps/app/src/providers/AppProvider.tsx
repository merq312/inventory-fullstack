import { createContext, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';

const theme = createTheme();

theme.typography.h1 = {
  fontSize: '1.4rem',
  fontWeight: 'normal',
};

theme.palette.primary = {
  light: '#d5d5d5',
  main: '#333',
  dark: '#222720',
  contrastText: '#fff',
};

export interface IStoreContext {
  storeName: string;
  setStoreName: (arg0: string) => void;
  drawer: boolean;
  setDrawer: (arg0: boolean) => void;
  authToken: string;
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);

type AppProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProps) => {
  const [storeName, setStoreName] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    getAccessTokenSilently().then(setAuthToken);
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreContext.Provider
          value={{
            storeName: storeName,
            setStoreName: setStoreName,
            drawer: drawer,
            setDrawer: setDrawer,
            authToken: authToken,
          }}
        >
          {children}
        </StoreContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
