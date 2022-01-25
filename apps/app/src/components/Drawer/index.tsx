import {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import BarChartIcon from '@mui/icons-material/BarChart';
import StoreIcon from '@mui/icons-material/Store';
import LoopIcon from '@mui/icons-material/Loop';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Collapse, ListItemButton } from '@mui/material';
import { StoreContext } from '../../providers';
import { getAllStores } from '../../utils/api';
import { Star, StarBorder } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

type StoreData = {
  id: number;
  name: string;
};

export default function Drawer() {
  const [open, setOpen] = useState(true);
  const [stores, setStores] = useState<Array<StoreData>>([]);
  const { storeName, setStoreName, drawer, setDrawer } =
    useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('Loading ...');

  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getAllStores()
      .then(setStores)
      .catch((err) => setErrorMsg(err.message));
  }, []);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawer(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/" key={'Home'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard" key={'Dashboard'}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="inventory-input"
          key={'InventoryInput'}
          data-cy="inventory-input"
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory Input" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="inventory-info"
          key={'InventoryInfo'}
          data-cy="inventory-info"
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory Info" />
        </ListItem>
        <Divider />
        <ListItem
          button
          key={'Stores'}
          id={'dropdown'}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText>Stores</ListItemText>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {stores && stores.length !== 0 ? (
              stores.map((store) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={store.id}
                  onClick={() => {
                    if (setStoreName) setStoreName(store.name);
                  }}
                  data-cy={store.name}
                >
                  <ListItemIcon>
                    {storeName === store.name ? <Star /> : <StarBorder />}
                  </ListItemIcon>
                  <ListItemText primary={store.name} />
                </ListItemButton>
              ))
            ) : (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LoopIcon />
                </ListItemIcon>
                <ListItemText primary={errorMsg} />
              </ListItemButton>
            )}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button key={'LogOut'}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {isAuthenticated ? (
            <ListItemText
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log Out
            </ListItemText>
          ) : (
            <ListItemText onClick={() => loginWithRedirect()}>
              Log In
            </ListItemText>
          )}
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        open={drawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
