import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoreData } from '../index';
import InputTableRow from '../../../components/input-table-row/input-table-row';

type AppProps = {
  data: StoreData;
  newStoreItemName: string;
  setNewStoreItemName: (arg0: string) => void;
  setNewStoreItemPrice: (arg0: string) => void;
};

function StoreMenuTable({
  data,
  newStoreItemName,
  setNewStoreItemName,
  setNewStoreItemPrice,
}: AppProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.menuItems.map((item) => (
              <TableRow
                key={item.menuItem.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#e3f2fd' },
                }}
              >
                <TableCell component="th" scope="row">
                  {item.menuItem.name}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
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
                {'No store selected'}
              </TableCell>
              <TableCell align="right">{''}</TableCell>
            </TableRow>
          )}
          {!!newStoreItemName && (
            <InputTableRow
              cellOneText={newStoreItemName}
              placeholder="Price"
              error={false}
              close={() => {
                setNewStoreItemName('');
              }}
              dispatch={setNewStoreItemPrice}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StoreMenuTable;
