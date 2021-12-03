import { KeyboardEvent, MouseEvent } from 'react';
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
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

type AppProps = {
  setDrawer: (arg0: boolean) => void;
  drawer: boolean;
};

export default function SettingsDrawer({ drawer, setDrawer }: AppProps) {
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
