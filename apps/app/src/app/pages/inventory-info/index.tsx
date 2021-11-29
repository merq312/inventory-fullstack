import { Box } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import InventoryInfoHeader from './header';
import InventoryInfo from './card';

function InventoryInfoPage() {
  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <DatePicker />
      <InventoryInfoHeader />
      <InventoryInfo />
      <InventoryInfo />
      <InventoryInfo />
      <InventoryInfo />
      <InventoryInfo />
      <InventoryInfo />
    </Box>
  );
}

export default InventoryInfoPage;
