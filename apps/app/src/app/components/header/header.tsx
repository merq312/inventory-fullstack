import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from '../login-button/login-button';
import LogOutButton from '../logout-button/logout-button';
import { useContext } from 'react';
import { StoreContext } from '../../app';
import styled from 'styled-components';

const ResponsiveTypography = styled(Box)`
  @media (max-width: 450px) {
    display: none;
  }
`;

type AppProps = {
  setDrawer: (arg0: boolean) => void;
};

export function Header({ setDrawer }: AppProps) {
  const location = useLocation();
  const { storeName } = useContext(StoreContext);

  const { user, isAuthenticated } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h1" component="h1" sx={{ flexGrow: 1 }}>
          {location.pathname === '/'
            ? 'Home'
            : location.pathname
                .substring(1)
                .split('-')
                .map((ea) => ea[0].toUpperCase() + ea.substring(1))
                .join(' ')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ResponsiveTypography>
            <Typography variant="body1" component="h2" sx={{ mr: 2 }}>
              {isAuthenticated && user ? `${user.name} ` : `Guest `}
              {storeName && `@ ${storeName}`}
            </Typography>
          </ResponsiveTypography>
          {isAuthenticated ? <LogOutButton /> : <LogInButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
