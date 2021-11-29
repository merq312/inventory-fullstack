import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ItemSearch() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={['California', 'Salmon Avo']}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}

export default ItemSearch
