import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoreData } from '../index';

type AppProps = {
  data: Array<StoreData>;
  selectedStore: string;
  setSelectedStore: (arg0: string) => void;
};

function StoreTable({ data, selectedStore, setSelectedStore }: AppProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((store) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoreTable;
