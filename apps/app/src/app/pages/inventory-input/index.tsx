import { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import SessionPicker from '../../features/session-picker/session-picker';
import InventoryInputCard from './card';
import axios from 'axios';
import { MenuItem } from '../inventory-info';
import dayjs from 'dayjs';

// type PostItem = {
//   name: string;
//   counts: {
//     overnightCount: number;
//     morningCount: number;
//     afternoonCount: number;
//     leftoverCountOne: number;
//     leftoverCountTwo: number;
//   }
// }

function InventoryInputPage() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [session, setSession] = useState<keyof MenuItem>('overnightCount');

  function getData(date: string) {
    axios.get(`http://localhost:3333/api/v1/product/rcss/${date}`)
      .then(r => {
        console.log('SUCCESS: received data');
        setData(r.data.data);
      })
      .catch(() => {
        console.log('FAILURE: Did not receive data');
      });
  }

  useEffect(() => {
    getData(date);
  }, [date]);

  const handleClick = () => {
    data.forEach(console.log);
    // axios.patch(`http://localhost:3333/api/v1/product/rcss`, { productData: formData })
    //   .then(() => {
    //     console.log('SUCCESS: submitted form data')
    //     getData(date)
    //   })
    //   .catch(() => {
    //     console.log('FAILURE');
    //   });
  };

  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <Grid sx={{ alignItems: 'center' }} container spacing={2}>
        <Grid item xs={6}>
          <DatePicker setDate={setDate} />
        </Grid>
        <Grid item xs={6}>
          <SessionPicker setSession={setSession} />
        </Grid>
      </Grid>
      {
        Object.values(data).map(item => <InventoryInputCard key={item.name} name={item.name}
                                                            value={item[session] as number} />)
      }
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Box>
  );
}

export default InventoryInputPage;
