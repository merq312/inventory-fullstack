import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { MenuItemData } from '../index';
import InputTableRow from '../../../components/input-table-row/input-table-row';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

type AppProps = {
  menuData: Array<MenuItemData>;
  setNewMenuItemName: (arg0: string) => void;
  setNewStoreItemName: (arg0: string) => void;
  selectedStore: string;
  newItemError: boolean;
  setNewItemError: (arg0: boolean) => void;
  errorMsg: string;
};

function MenuTable({
  menuData,
  setNewMenuItemName,
  setNewStoreItemName,
  selectedStore,
  newItemError,
  setNewItemError,
  errorMsg,
}: AppProps) {
  const [showInput, setShowInput] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Menu Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.length !== 0 ? (
              menuData.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#e3f2fd' },
                    backgroundColor: () => (item.inStore ? '#eeeeee' : 'white'),
                  }}
                >
                  <TableCell
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    component="th"
                    scope="row"
                  >
                    <span>{item.name}</span>
                    {!item.inStore && selectedStore && (
                      <IconButton
                        size="small"
                        onClick={() => setNewStoreItemName(item.name)}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
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
            {showInput && (
              <InputTableRow
                error={newItemError}
                placeholder="Menu Item Name"
                close={() => {
                  setShowInput(false);
                  setNewItemError(false);
                }}
                dispatch={setNewMenuItemName}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ alignSelf: 'end' }} onClick={() => setShowInput(true)}>
        Add new menu item
      </Button>
    </Box>
  );
}

export default MenuTable;
