import { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ItemSearch from '../../components/ItemSearch';
import DatePicker from '../../components/DatePicker';
import SessionPicker from '../../components/SessionPicker';
import InventoryInputCard from './Card';
import { MenuItem } from '../InventoryInfo/types';
import dayjs from 'dayjs';
import ErrorCard from '../../components/ErrorCard';
import { getProductData, updateProductCounts } from '../../utils/api';
import { ItemsContainer } from '../../utils/styles';
import usePost from '../../hooks/usePost';
import useStore from '../../hooks/useStore';

function InventoryInput() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const { storeName, errorMsg, setErrorMsg } = useStore();
  const { post, addItemsAction, modifyItemAction } = usePost();

  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [filter, setFilter] = useState('');
  const [session, setSession] = useState<keyof MenuItem>('overnightCount');

  useEffect(() => {
    if (storeName) {
      getProductData(storeName, date)
        .then((data) => {
          setData(data);
          addItemsAction(data);
        })
        .catch((err) => setErrorMsg(err.message));
    }
  }, [addItemsAction, date, setErrorMsg, storeName]);

  const handleClick = () => {
    updateProductCounts(storeName, post, date)
      .then(() => {
        getProductData(storeName, date).then((data) => {
          setData(data);
          addItemsAction(data);
        });
      })
      .catch((err) => setErrorMsg(err.message));
  };

  return (
    <Box sx={{ m: 2 }}>
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <ItemSearch
          itemNames={data
            .filter((item) => !item.retired)
            .map((item) => item.name)}
          dispatch={setFilter}
        />
        <Grid sx={{ alignItems: 'center' }} container spacing={2}>
          <Grid item xs={6}>
            <DatePicker setDate={setDate} />
          </Grid>
          <Grid item xs={6}>
            <SessionPicker setSession={setSession} />
          </Grid>
        </Grid>
      </Box>
      {data.length !== 0 ? (
        <ItemsContainer>
          {filter === ''
            ? data
                .filter((item) => !item.retired)
                .map((item) => (
                  <InventoryInputCard
                    key={item.name}
                    name={item.name}
                    value={item[session] as number}
                    dispatch={(value: number) =>
                      modifyItemAction(item.name, value, session)
                    }
                  />
                ))
            : data
                .filter((item) => item.name === filter)
                .map((item) => (
                  <InventoryInputCard
                    key={item.name}
                    name={item.name}
                    value={item[session] as number}
                    dispatch={(value: number) =>
                      modifyItemAction(item.name, value, session)
                    }
                  />
                ))}
        </ItemsContainer>
      ) : (
        <ErrorCard msg={errorMsg} />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Box>
  );
}

export default InventoryInput;
