import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoreData } from '../index';

type AppProps = {
  storeData: Array<StoreData>;
  selectedStore: string;
  setSelectedStore: (arg0: string) => void;
  errorMsg: string;
};

function StoreTable({
  storeData,
  selectedStore,
  setSelectedStore,
  errorMsg,
}: AppProps) {
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
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  backgroundColor: () =>
                    store.name === selectedStore ? '#e3f2fd' : 'white',
                }}
                onClick={() => {
                  if (store.name) setSelectedStore(store.name);
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
                '&:hover': { backgroundColor: '#e3f2fd' },
              }}
            >
              <TableCell component="th" scope="row">
                {errorMsg ? errorMsg : 'Loading...'}
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
