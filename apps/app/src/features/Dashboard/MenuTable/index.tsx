import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputTableRow from '../InputTableRow';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material';
import { DashboardContext, StoreContext } from '../../../providers';
import {
  changeMenuItemName,
  createNewMenuItem,
  getAllMenuItems,
  getAllStoresWithMenu,
} from '../../../utils/api';
import {
  setMenuData,
  setNewStoreItemName,
  setStoreData,
} from '../../../hooks/useDashboard';

type AppProps = {
  setAlert: (arg0: boolean) => void;
  isAuthenticated: boolean;
};

export default function MenuTable({ setAlert, isAuthenticated }: AppProps) {
  const {
    state: { menuData, selectedStore, menuLoadError },
    dispatch,
  } = useContext(DashboardContext);
  const { authToken } = useContext(StoreContext);

  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [showRenameButton, setShowRenameButton] = useState('');

  const [newMenuItemName, setNewMenuItemName] = useState('');
  const [newMenuItemError, setNewMenuItemError] = useState(false);

  const [renameInput, setRenameInput] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameError, setRenameError] = useState(false);

  const theme = useTheme();

  const handleClick = (func: () => void) => () => {
    if (process.env.NODE_ENV === 'development') {
      func();
    } else {
      if (isAuthenticated) {
        func();
      } else {
        setAlert(true);
      }
    }
  };

  useEffect(() => {
    if (newMenuItemName) {
      createNewMenuItem(newMenuItemName, authToken)
        .then(() => getAllMenuItems())
        .then((data) => dispatch(setMenuData(data)))
        .then(() => setNewMenuItemError(false))
        .catch(() => setNewMenuItemError(true));

      setNewMenuItemName('');
    }
  }, [authToken, dispatch, newMenuItemName]);

  useEffect(() => {
    if (renameInput && renameValue) {
      changeMenuItemName(renameInput, renameValue, authToken)
        .then(() => getAllMenuItems())
        .then((data) => dispatch(setMenuData(data)))
        .then(getAllStoresWithMenu)
        .then((data) => dispatch(setStoreData(data)))
        .then(() => {
          setRenameError(false);
        })
        .catch(() => setRenameError(true));

      setRenameInput('');
      setRenameValue('');
    }
  }, [authToken, dispatch, renameInput, renameValue]);

  const mapMenuData = () => {
    return menuData.map((item) =>
      renameInput === item.name ? (
        <InputTableRow
          key={item.name}
          placeholder={item.name}
          error={renameError}
          close={() => {
            setRenameInput('');
            setRenameValue('');
            setRenameError(false);
          }}
          dispatch={setRenameValue}
        />
      ) : (
        <TableRow
          key={item.name}
          sx={{
            '& th, & td': { height: '2.2rem' },
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': { backgroundColor: theme.palette.primary.light },
            backgroundColor: () =>
              item.inStore ? theme.palette.grey['200'] : 'white',
          }}
          onMouseOver={() => setShowRenameButton(item.name)}
        >
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            component="th"
            scope="row"
          >
            <span>{item.name}</span>
            <Box>
              {!renameInput && showRenameButton === item.name && (
                <IconButton
                  size="small"
                  onClick={handleClick(() => setRenameInput(item.name))}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {!item.inStore && selectedStore && (
                <IconButton
                  size="small"
                  onClick={handleClick(() =>
                    dispatch(setNewStoreItemName(item.name))
                  )}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </TableCell>
        </TableRow>
      )
    );
  };

  const displayStatusMessage = () => {
    return (
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': { backgroundColor: theme.palette.primary.light },
        }}
      >
        <TableCell component="th" scope="row">
          {menuLoadError ? menuLoadError : 'Loading...'}
        </TableCell>
        <TableCell align="right">{''}</TableCell>
      </TableRow>
    );
  };

  const displayNewItemInput = () => {
    return (
      <InputTableRow
        error={newMenuItemError}
        placeholder="Menu Item Name"
        close={() => {
          setShowNewItemInput(false);
          setNewMenuItemError(false);
        }}
        dispatch={setNewMenuItemName}
      />
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Menu Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody onMouseLeave={() => setShowRenameButton('')}>
            {menuData.length !== 0 ? mapMenuData() : displayStatusMessage()}
            {showNewItemInput && displayNewItemInput()}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ alignSelf: 'end' }}
        onClick={handleClick(() => setShowNewItemInput(true))}
      >
        Add new menu item
      </Button>
    </Box>
  );
}
