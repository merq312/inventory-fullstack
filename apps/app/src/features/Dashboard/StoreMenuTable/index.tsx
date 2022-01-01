import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DashboardContext } from '../../../providers';
import { useContext, useEffect, useState } from 'react';
import InputTableRow from '../InputTableRow';
import {
  setNewStoreItemError,
  setNewStoreItemName,
  setNewStoreItemPrice,
} from '../../../hooks/useDashboard';

function StoreMenuTable() {
  const {
    state: { selectedStoreData, newStoreItemName, newStoreItemError },
  } = useContext(DashboardContext);

  const [showInput, setShowInput] = useState(false);
  const [showRetireButton, setShowRetireButton] = useState('');

  const theme = useTheme();

  useEffect(() => {
    newStoreItemName === '' ? setShowInput(false) : setShowInput(true);
  }, [newStoreItemName]);

  useEffect(() => {
    setShowInput(false);
  }, [selectedStoreData]);

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
          {selectedStoreData.menuItems.length !== 0 ? (
            selectedStoreData.menuItems.map((item) => (
              <TableRow
                key={item.menuItem.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: theme.palette.primary.light },
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
                    <IconButton size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
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
              error={newStoreItemError}
              close={() => {
                setShowInput(false);
                setNewStoreItemName('');
                setNewStoreItemPrice('');
                setNewStoreItemError(false);
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
