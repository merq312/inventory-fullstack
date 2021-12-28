import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';
import { DashboardContext } from '../../../providers/DashboardProvider';
import { useContext } from 'react';
import { setSelectedStore } from '../../../hooks/useDashboard';

function StoreTable() {
  const theme = useTheme();
  const {
    state: { storeData, selectedStore, storeLoadError },
    dispatch,
  } = useContext(DashboardContext);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storeData.length !== 0 ? (
            storeData.map((store) => (
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
            ))
          ) : (
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
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoreTable;
