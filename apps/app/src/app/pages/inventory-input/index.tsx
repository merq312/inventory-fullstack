import { useContext, useEffect, useReducer, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ItemSearch from '../../components/item-search/item-search';
import DatePicker from '../../components/date-picker/date-picker';
import SessionPicker from '../../components/session-picker/session-picker';
import InventoryInputCard from './card/card';
import { MenuItem } from '../inventory-info';
import dayjs from 'dayjs';
import ErrorCard from '../../components/error-card/error-card';
import { getProductData, updateProductCounts } from '../../utils/api-utils';
import { ItemsContainer } from '../../utils/styles';
import { StoreContext } from '../../app';

export type PostItem = {
  name: string;
  counts: {
    overnightCount: number;
    morningCount: number;
    afternoonCount: number;
    leftoverCountOne: number;
    leftoverCountTwo: number;
  };
};

const initialState: Array<PostItem> = [];

type Action =
  | { type: 'add_items'; items: Array<MenuItem> }
  | {
      type: 'modify_item';
      name: string;
      value: number;
      session: keyof PostItem['counts'];
    };

const reducer = (state: Array<PostItem>, action: Action) => {
  switch (action.type) {
    case 'modify_item': {
      return state.map((ea: PostItem) => {
        if (ea.name === action.name) {
          return {
            name: ea.name,
            counts: { ...ea.counts, [action.session]: action.value },
          };
        }
        return { ...ea };
      });
    }
    case 'add_items': {
      return action.items.map((item) => {
        return {
          name: item.name,
          counts: {
            overnightCount: item.overnightCount,
            morningCount: item.morningCount,
            afternoonCount: item.afternoonCount,
            leftoverCountOne: item.leftoverCountOne,
            leftoverCountTwo: item.leftoverCountTwo,
          },
        };
      });
    }
    default:
      return [...state];
  }
};

function InventoryInputPage() {
  const [data, setData] = useState<Array<MenuItem>>([]);
  const [post, setPost] = useReducer(reducer, initialState);
  const { storeName } = useContext(StoreContext);

  useEffect(() => {
    if (!storeName) {
      setErrorMsg('Please select a store');
    }
  }, [storeName]);

  const addItemsAction = (items: Array<MenuItem>) => {
    setPost({ type: 'add_items', items: items });
  };

  const modifyItemAction = (name: string, value: number, session: string) => {
    setPost({
      type: 'modify_item',
      name: name,
      value: value,
      session: session as keyof PostItem['counts'],
    });
  };

  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [session, setSession] = useState<keyof MenuItem>('overnightCount');
  const [errorMsg, setErrorMsg] = useState('Loading...');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (storeName) {
      getProductData(storeName, date)
        .then((data) => {
          setData(data);
          addItemsAction(data);
        })
        .catch((err) => setErrorMsg(err.message));
    }
  }, [date, storeName]);

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

export default InventoryInputPage;
