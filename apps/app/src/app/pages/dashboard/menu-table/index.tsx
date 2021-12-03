import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItemData } from '../index';

type AppProps = {
  data: Array<MenuItemData>
}

function MenuTable({ data }: AppProps) {
  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Menu Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#e3f2fd' } }}
            >
              <TableCell component='th' scope='row'>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MenuTable;
