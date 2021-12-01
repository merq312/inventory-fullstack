import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import InventoryInfoHeader from './header';
import InventoryInfoCard from './card';
import dayjs from 'dayjs';

export type MenuItem = {
  id: number;
  day: string;
  name: string;
  menuItemOnStoreId: number;
  overnightCount: number;
  morningCount: number;
  afternoonCount: number;
  leftoverCountOne: number;
  leftoverCountTwo: number;
}

function InventoryInfoPage() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    axios.get(`http://localhost:3333/api/v1/product/rcss/${date}`)
      .then(r => {
        console.log('SUCCESS: received data');
        setData(r.data.data);
      })
      .catch(() => {
        console.log('FAILURE: Did not receive data');
      });
  }, [date]);

  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <DatePicker setDate={setDate} />
      <InventoryInfoHeader />
      {
        Object.values(data).map(item => <InventoryInfoCard key={item.menuItemOnStoreId} item={item} />)
      }
    </Box>
  );
}

export default InventoryInfoPage;
