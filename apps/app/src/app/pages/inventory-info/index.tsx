import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ItemSearch from '../../components/item-search/item-search';
import DatePicker from '../../components/date-picker/date-picker';
import InventoryInfoHeader from './header';
import InventoryInfoCard from './card';
import dayjs from 'dayjs';
import ErrorCard from '../../components/error-card/error-card';
import { getData } from '../../utils/get-data';

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
  const [errorMsg, setErrorMsg] = useState('Loading...');

  useEffect(() => {
    getData(date)
      .then(setData)
      .catch(err => setErrorMsg(err.message));
  }, [date]);

  return (
    <Box sx={{ m: 2 }}>
      <ItemSearch />
      <DatePicker setDate={setDate} />
      <InventoryInfoHeader />
      {
        data.length !== 0
          ? Object.values(data).map(item => <InventoryInfoCard key={item.menuItemOnStoreId} item={item} />)
          : <ErrorCard msg={errorMsg} />
      }
    </Box>
  );
}

export default InventoryInfoPage;
