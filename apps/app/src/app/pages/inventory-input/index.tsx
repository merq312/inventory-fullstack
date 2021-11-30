import { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import SessionPicker from '../../features/session-picker/session-picker';
import InventoryInputCard from './card';
import axios from 'axios';
import { menuItem } from '../inventory-info';

function InventoryInputPage() {
  const [data, setData] = useState<Array<menuItem>>([]);
  const [date, setDate] = useState<string>('');
  const [session, setSession] = useState<string>('');

  useEffect(() => {
    axios.get(`http://localhost:3333/api/v1/product/rcss/${date}`)
      .then(r => {
        console.log('SUCCESS: received data');
        setData(r.data.data);
      })
      .catch(error => {
        console.log('FAILURE: Did not receive data');
      });
  }, [date]);

  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <Grid sx={{ alignItems: "center" }} container spacing={2}>
        <Grid item xs={6}>
          <DatePicker setDate={setDate} />
        </Grid>
        <Grid item xs={6}>
          <SessionPicker setSession={setSession} />
        </Grid>
      </Grid>
      {
        Object.values(data).map(item => <InventoryInputCard key={item.menuItemOnStoreId} item={item} session={session} />)
      }
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button>Submit</Button>
      </Box>
    </Box>
  );
}

export default InventoryInputPage;
