import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoreData } from '../index';
import InputTableRow from '../../../components/input-table-row/input-table-row';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

type AppProps = {
  storeData: StoreData;
  newStoreItemName: string;
  setNewStoreItemName: (arg0: string) => void;
  setNewStoreItemPrice: (arg0: string) => void;
  newItemError: boolean;
  setNewItemError: (arg0: boolean) => void;
};

function StoreMenuTable({
  storeData,
  newStoreItemName,
  setNewStoreItemName,
  setNewStoreItemPrice,
  newItemError,
  setNewItemError,
}: AppProps) {
  const [showInput, setShowInput] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    newStoreItemName === '' ? setShowInput(false) : setShowInput(true);
  }, [newStoreItemName]);

  useEffect(() => {
    setShowInput(false);
  }, [storeData]);

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
          {storeData.menuItems.length !== 0 ? (
            storeData.menuItems.map((item) => (
              <TableRow
                key={item.menuItem.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: theme.palette.primary.light },
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
                '&:hover': { backgroundColor: theme.palette.primary.light },
              }}
            >
              <TableCell component="th" scope="row">
                {'No store selected'}
              </TableCell>
              <TableCell align="right">{''}</TableCell>
            </TableRow>
          )}
          {showInput && (
            <InputTableRow
              cellOneText={newStoreItemName}
              placeholder="Price"
              error={newItemError}
              close={() => {
                setShowInput(false);
                setNewStoreItemName('');
                setNewStoreItemPrice('');
                setNewItemError(false);
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
