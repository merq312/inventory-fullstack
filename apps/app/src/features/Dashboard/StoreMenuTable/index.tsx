import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DashboardContext, StoreContext } from '../../../providers';
import { useContext, useEffect, useState } from 'react';
import InputTableRow from '../InputTableRow';
import {
  setNewStoreItemError,
  setNewStoreItemName,
  setNewStoreItemPrice,
  setStoreData,
} from '../../../hooks/useDashboard';
import { getAllStoresWithMenu, retireStoreItem } from '../../../utils/api';

type AppProps = {
  callIfAuthenticated: (arg0: () => void) => () => void;
};

export default function StoreMenuTable({ callIfAuthenticated }: AppProps) {
  const {
    state: {
      selectedStoreData,
      newStoreItemName,
      newStoreItemError,
      selectedStore,
    },
    dispatch,
  } = useContext(DashboardContext);
  const { authToken } = useContext(StoreContext);

  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [showRetireButton, setShowRetireButton] = useState('');

  const theme = useTheme();

  useEffect(() => {
    !newStoreItemName ? setShowNewItemInput(false) : setShowNewItemInput(true);
  }, [newStoreItemName]);

  useEffect(() => {
    setShowNewItemInput(false);
  }, [selectedStoreData]);

  const handleRetireItem = (menuItemName: string, isRetired: boolean) => {
    retireStoreItem(selectedStore, menuItemName, !isRetired, authToken)
      .then(() => getAllStoresWithMenu())
      .then((data) => dispatch(setStoreData(data)));
  };

  const mapSelectedStoreData = () => {
    return selectedStoreData.menuItems.map((item) => (
      <TableRow
        key={item.menuItem.name}
        sx={{
          '& th, & td': { height: '2.2rem' },
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': { backgroundColor: theme.palette.primary.light },
          backgroundColor: () =>
            item.retired ? theme.palette.grey['200'] : 'white',
        }}
        onMouseOver={() => setShowRetireButton(item.menuItem.name)}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {item.menuItem.name}
          {showRetireButton === item.menuItem.name && (
            <IconButton
              size="small"
              onClick={callIfAuthenticated(() =>
                handleRetireItem(item.menuItem.name, item.retired)
              )}
            >
              {item.retired ? (
                <AddIcon fontSize="small" />
              ) : (
                <DeleteIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell align="right">{item.price}</TableCell>
      </TableRow>
    ));
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
          {selectedStore ? 'No items in store menu' : 'No store selected'}
        </TableCell>
        <TableCell align="right">{''}</TableCell>
      </TableRow>
    );
  };

  const displayNewItemInput = () => {
    return (
      <InputTableRow
        cellOneText={newStoreItemName}
        placeholder="Price"
        error={newStoreItemError}
        close={() => {
          setShowNewItemInput(false);
          dispatch(setNewStoreItemName(''));
          dispatch(setNewStoreItemPrice(''));
          dispatch(setNewStoreItemError(false));
        }}
        dispatch={(price) => dispatch(setNewStoreItemPrice(price))}
      />
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody onMouseLeave={() => setShowRetireButton('')}>
          {selectedStoreData.menuItems.length !== 0
            ? mapSelectedStoreData()
            : displayStatusMessage()}
          {showNewItemInput && displayNewItemInput()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
