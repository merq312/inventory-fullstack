import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ItemSearch from '../../components/item-search/item-search';
import DatePicker from '../../components/date-picker/date-picker';
import InventoryInfoHeader from './header/header';
import InventoryInfoCard from './card/card';
import dayjs from 'dayjs';
import ErrorCard from '../../components/error-card/error-card';
import { getProductData } from '../../utils/get-data';
import { ItemsContainer } from '../../utils/styles';

export type MenuItem = {
  id: number
  day: string
  name: string
  menuItemOnStoreId: number
  overnightCount: number
  morningCount: number
  afternoonCount: number
  leftoverCountOne: number
  leftoverCountTwo: number
}

function InventoryInfoPage() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [errorMsg, setErrorMsg] = useState('Loading...');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getProductData(date)
      .then(setData)
      .catch(err => setErrorMsg(err.message));
  }, [date]);

  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <ItemsContainer>
          <ItemSearch  itemNames={data.map(item => item.name)} dispatch={setFilter} />
          <DatePicker setDate={setDate} />
        </ ItemsContainer>
        <InventoryInfoHeader />
      </Box>
      {
        data.length !== 0
          ? (
            <ItemsContainer>
              {
                filter === ''
                  ? data
                    .map(item => <InventoryInfoCard key={item.name} item={item} />)
                  : data
                    .filter(item => item.name === filter)
                    .map(item => <InventoryInfoCard key={item.name} item={item} />)
              }
            </ItemsContainer>
          )
          : <ErrorCard msg={errorMsg} />
      }
    </Box>
  );
}

export default InventoryInfoPage;
