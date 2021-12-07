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
import { StoreContext } from '../../app';
import { getAllStores } from '../../utils/api-utils';
import { StarBorder } from '@mui/icons-material';

type AppProps = {
  setDrawer: (arg0: boolean) => void;
  drawer: boolean;
};

type StoreData = {
  id: number;
  name: string;
};

export default function SettingsDrawer({ drawer, setDrawer }: AppProps) {
  const [open, setOpen] = useState(true);
  const [stores, setStores] = useState<Array<StoreData>>([]);
  const { setStoreName } = useContext(StoreContext);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getAllStores().then(setStores).catch(console.log);
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
            {stores.length !== 0 ? (
              stores.map((store) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={store.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (setStoreName) setStoreName(store.name);
                  }}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={store.name} />
                </ListItemButton>
              ))
            ) : (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LoopIcon />
                </ListItemIcon>
                <ListItemText primary="Loading stores..." />
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
          <ListItemText>Log Out</ListItemText>
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
