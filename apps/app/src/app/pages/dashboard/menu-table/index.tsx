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
import EditIcon from '@mui/icons-material/Edit';

type AppProps = {
  menuData: Array<MenuItemData>;
  setNewMenuItemName: (arg0: string) => void;
  setNewStoreItemName: (arg0: string) => void;
  selectedStore: string;
  newItemError: boolean;
  setNewItemError: (arg0: boolean) => void;
  errorMsg: string;
  renameInput: string;
  setRenameInput: (arg0: string) => void;
  setRenameValue: (arg0: string) => void;
  renameError: boolean;
  setRenameError: (arg0: boolean) => void;
};

function MenuTable({
  menuData,
  setNewMenuItemName,
  setNewStoreItemName,
  selectedStore,
  newItemError,
  setNewItemError,
  errorMsg,
  renameInput,
  setRenameInput,
  setRenameValue,
  renameError,
  setRenameError,
}: AppProps) {
  const [showNewItemInput, setShowNewItemInput] = useState(false);
  const [showRenameButton, setShowRenameButton] = useState('');

  function mapMenuData() {
    return menuData.map((item) =>
      renameInput === item.name ? (
        <InputTableRow
          key={item.name}
          placeholder={item.name}
          error={renameError}
          close={() => {
            setRenameInput('');
            setRenameValue('');
            setRenameError(false);
          }}
          dispatch={setRenameValue}
        />
      ) : (
        <TableRow
          key={item.name}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
            '&:hover': { backgroundColor: '#e3f2fd' },
            backgroundColor: () => (item.inStore ? '#eeeeee' : 'white'),
          }}
          onMouseOver={() => setShowRenameButton(item.name)}
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
            <Box>
              {!renameInput && showRenameButton === item.name && (
                <IconButton
                  size="small"
                  onClick={() => setRenameInput(item.name)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
              {!item.inStore && selectedStore && (
                <IconButton
                  size="small"
                  onClick={() => setNewStoreItemName(item.name)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </TableCell>
        </TableRow>
      )
    );
  }

  function displayStatusMessage() {
    return (
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
    );
  }

  function displayNewItemInput() {
    return (
      <InputTableRow
        error={newItemError}
        placeholder="Menu Item Name"
        close={() => {
          setShowNewItemInput(false);
          setNewItemError(false);
        }}
        dispatch={setNewMenuItemName}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Menu Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody onMouseLeave={() => setShowRenameButton('')}>
            {menuData.length !== 0 ? mapMenuData() : displayStatusMessage()}
            {showNewItemInput && displayNewItemInput()}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ alignSelf: 'end' }}
        onClick={() => setShowNewItemInput(true)}
      >
        Add new menu item
      </Button>
    </Box>
  );
}

export default MenuTable;
