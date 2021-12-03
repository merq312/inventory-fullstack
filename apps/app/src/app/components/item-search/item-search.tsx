import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';

type AppProps = {
  itemNames: Array<string>;
  dispatch: (arg0: string) => void;
}

function ItemSearch({ itemNames, dispatch }: AppProps) {
  const handleChange = (event: SyntheticEvent, value: string | null) => value ? dispatch(value) : dispatch('');

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={itemNames}
      sx={{alignSelf: 'center'}}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label='Search' />}
    />
  );
}

export default ItemSearch;
