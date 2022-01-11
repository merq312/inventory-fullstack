import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, useTheme } from '@mui/material';
import { DashboardContext } from '../../../providers';
import { useContext, useEffect, useState } from 'react';
import { setSelectedStore, setStoreData } from '../../../hooks/useDashboard';
import InputTableRow from '../InputTableRow';
import Button from '@mui/material/Button';
import { createNewStore, getAllStoresWithMenu } from '../../../utils/api';

type AppProps = {
  setAlert: (arg0: boolean) => void;
  isAuthenticated: boolean;
};

function StoreTable({ setAlert, isAuthenticated }: AppProps) {
  const {
    state: { storeData, selectedStore, storeLoadError },
    dispatch,
  } = useContext(DashboardContext);

  const [showNewStoreInput, setShowNewStoreInput] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreError, setNewStoreError] = useState(false);

  const theme = useTheme();

  const handleClick = (func: () => void) => () => {
    if (isAuthenticated) {
      func();
    } else {
      setAlert(true);
    }
  };

  useEffect(() => {
    if (newStoreName) {
      setNewStoreName('');

      createNewStore(newStoreName)
        .then(() => getAllStoresWithMenu())
        .then((data) => dispatch(setStoreData(data)))
        .catch(() => setNewStoreError(true));
    }
  }, [dispatch, newStoreName]);

  function mapStoreData() {
    return storeData.map((store) => (
      <TableRow
        key={store.name}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': { backgroundColor: theme.palette.primary.light },
          backgroundColor: () =>
            store.name === selectedStore
              ? theme.palette.primary.light
              : 'white',
        }}
        onClick={() => {
          if (store.name) dispatch(setSelectedStore(store.name));
        }}
      >
        <TableCell component="th" scope="row">
          {store.name}
        </TableCell>
      </TableRow>
    ));
  }

  function displayStatusMessage() {
    return (
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': { backgroundColor: theme.palette.primary.light },
        }}
      >
        <TableCell component="th" scope="row">
          {storeLoadError ? storeLoadError : 'Loading...'}
        </TableCell>
        <TableCell align="right">{''}</TableCell>
      </TableRow>
    );
  }

  function displayNewStoreInput() {
    return (
      <InputTableRow
        error={newStoreError}
        placeholder="New Store Name"
        close={() => {
          setShowNewStoreInput(false);
          setNewStoreError(false);
        }}
        dispatch={setNewStoreName}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stores</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeData.length !== 0 ? mapStoreData() : displayStatusMessage()}
            {showNewStoreInput && displayNewStoreInput()}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ alignSelf: 'end' }}
        onClick={handleClick(() => setShowNewStoreInput(true))}
      >
        Create new store
      </Button>
    </Box>
  );
}

export default StoreTable;
