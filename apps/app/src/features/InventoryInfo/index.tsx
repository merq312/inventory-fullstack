import { useEffect, useState } from 'react';
import ItemSearch from '../../components/ItemSearch';
import DatePicker from '../../components/DatePicker';
import InventoryInfoHeader from './Header';
import InventoryInfoCard from './Card';
import ErrorCard from '../../components/ErrorCard';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { getProductData } from '../../utils/api';
import { ItemsContainer } from '../../utils/styles';
import { ItemTotals, MenuItem } from './types';
import useStore from '../../hooks/useStore';

function InventoryInfo() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const { storeName, errorMsg, setErrorMsg } = useStore();

  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [filter, setFilter] = useState('');

  const [itemTotals, setItemTotals] = useState<ItemTotals>(new ItemTotals());

  useEffect(() => {
    if (storeName) {
      getProductData(storeName, date)
        .then(setData)
        .catch((err) => setErrorMsg(err.message));
    }
  }, [date, setErrorMsg, storeName]);

  useEffect(() => {
    setItemTotals(
      data.reduce((prev, curr) => {
        const temp = new ItemTotals();
        for (const key of Object.keys(prev)) {
          temp[key as keyof ItemTotals] =
            prev[key as keyof ItemTotals] +
            (curr[key as keyof MenuItem] as number);
        }
        return temp;
      }, new ItemTotals())
    );
  }, [data]);

  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <ItemsContainer>
          <ItemSearch
            itemNames={data
              .filter((item) => !item.retired)
              .map((item) => item.name)}
            dispatch={setFilter}
          />
          <DatePicker setDate={setDate} />
        </ItemsContainer>
        <InventoryInfoHeader totals={itemTotals} />
      </Box>
      {data.length !== 0 ? (
        <ItemsContainer>
          {filter === ''
            ? data
                .filter((item) => !item.retired)
                .map((item) => (
                  <InventoryInfoCard key={item.name} item={item} />
                ))
            : data
                .filter((item) => item.name === filter)
                .map((item) => (
                  <InventoryInfoCard key={item.name} item={item} />
                ))}
        </ItemsContainer>
      ) : (
        <ErrorCard msg={errorMsg} />
      )}
    </Box>
  );
}

export default InventoryInfo;
