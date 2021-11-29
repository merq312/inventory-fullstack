import { Box, Grid } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import SessionPicker from '../../features/session-picker/session-picker';
import InventoryInput from './card';

function InventoryInputPage() {
  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <Grid sx={{ alignItems: "center" }} container spacing={2}>
        <Grid item xs={6}>
          <DatePicker />
        </Grid>
        <Grid item xs={6}>
          <SessionPicker />
        </Grid>
      </Grid>
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
