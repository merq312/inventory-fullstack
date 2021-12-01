import { useEffect, useReducer, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ItemSearch from '../../features/item-search/item-search';
import DatePicker from '../../features/date-picker/date-picker';
import SessionPicker from '../../features/session-picker/session-picker';
import InventoryInputCard from './card';
import axios from 'axios';
import { MenuItem } from '../inventory-info';
import dayjs from 'dayjs';

type PostItem = {
  name: string;
  counts: {
    overnightCount: number;
    morningCount: number;
    afternoonCount: number;
    leftoverCountOne: number;
    leftoverCountTwo: number;
  }
}

const initialState: Array<PostItem> = [];

type Action =
  | { type: 'add_items', items: Array<MenuItem> }
  | { type: 'modify_item', name: string,  value: number, session: keyof PostItem['counts'] }

const reducer = (state: Array<PostItem>, action: Action) => {
    switch (action.type) {
      case 'modify_item': {
        return state.map((ea: PostItem) => {
          if (ea.name === action.name) {
            return { name: ea.name , counts: { ...ea.counts, [action.session]: action.value }}
          }
          return { ...ea }
        })
      }
      case 'add_items': {
        return action.items.map(item => {
          return {
            name: item.name,
            counts: {
              overnightCount: item.overnightCount,
              morningCount: item.morningCount,
              afternoonCount: item.afternoonCount,
              leftoverCountOne: item.leftoverCountOne,
              leftoverCountTwo: item.leftoverCountTwo
            }
          };
        })
      }
      default:
        return [...state];
    }
  }
;

function InventoryInputPage() {
  const [state, setState] = useReducer(reducer, initialState);

  const addItemAction = (items: Array<MenuItem>) => {
    setState({ type: 'add_items', items: items });
  };

  const modifyItemAction = (name: string, value: number, session: string) => {
    setState({ type: 'modify_item', name: name, value: value, session: session as keyof PostItem['counts'] });
  };

  const [data, setData] = useState<Array<MenuItem>>([]);
  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [session, setSession] = useState<keyof MenuItem>('overnightCount');

  useEffect(() => {
    axios.get(`http://localhost:3333/api/v1/product/rcss/${date}`)
      .then(r => {
        console.log('SUCCESS: received data');
        setData(r.data.data);
        addItemAction(r.data.data);
      })
      .catch(() => {
        console.log('FAILURE: Did not receive data');
      });
  }, [date]);

  const handleClick = () => {
    console.log(state)
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
                                                            value={item[session] as number}
                                                            dispatch={(value: number) => modifyItemAction(item.name, value, session)} />)
      }
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Box>
  );
}

export default InventoryInputPage;
