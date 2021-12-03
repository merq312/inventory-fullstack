import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoreData } from '../index';
import { useState } from 'react';

type AppProps = {
  data: Array<StoreData>
  dispatch: (arg0: string) => void
}

function StoreTable({ data, dispatch }: AppProps) {
  const [selectedStore, setSelectedStore] = useState<string>('');

  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='simple table'>
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
                backgroundColor: () => store.name === selectedStore ? '#e3f2fd' : 'white'
              }}
              onClick={() => {
                dispatch(store.name);
                setSelectedStore(store.name);
              }}
            >
              <TableCell component='th' scope='row'>{store.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoreTable;
