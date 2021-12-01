import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SyntheticEvent } from 'react';

function ItemSearch() {
  const handleChange = (event: SyntheticEvent, value: string | null) => {
    console.log(value)
  }

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={['California', 'Salmon Avo']}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label='Search' />}
    />
  );
}

export default ItemSearch;
