import { Box } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import InventoryInput from './card';

function InventoryInputPage() {
  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <DatePicker />
      <InventoryInput />
      <InventoryInput />
      <InventoryInput />
      <InventoryInput />
      <InventoryInput />
      <InventoryInput />
    </Box>
  );
}

export default InventoryInputPage;
