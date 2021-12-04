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

type AppProps = {
  data: Array<MenuItemData>;
  setNewItemName: (arg0: string) => void;
  newItemError: boolean;
};

function MenuTable({ data, setNewItemName, newItemError }: AppProps) {
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
            {data.map((item) => (
              <TableRow
                key={item.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  backgroundColor: () => (item.inStore ? '#eeeeee' : 'white'),
                }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
              </TableRow>
            ))}
            {showInput && (
              <InputTableRow
                error={newItemError}
                placeholder="Menu Item Name"
                close={() => setShowInput(false)}
                dispatch={setNewItemName}
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
