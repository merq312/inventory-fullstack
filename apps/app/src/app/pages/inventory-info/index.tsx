import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import ItemSearch from '../../components/item-search/item-search';
import DatePicker from '../../components/date-picker/date-picker';
import InventoryInfoHeader from './header';
import InventoryInfoCard from './card';
import dayjs from 'dayjs';
import ErrorCard from '../../components/error-card/error-card';

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
        setData(r.data.data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, [date]);

  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <DatePicker setDate={setDate} />
      <InventoryInfoHeader />
      {
        data === []
          ? Object.values(data).map(item => <InventoryInfoCard key={item.menuItemOnStoreId} item={item} />)
          : <ErrorCard />
      }
    </Box>
  );
}

export default InventoryInfoPage;
