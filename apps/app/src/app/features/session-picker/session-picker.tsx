import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function SessionPicker() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={['MC', 'M', 'A', 'L1', 'L2']}
      renderInput={(params) => <TextField {...params} label="Session" />}
    />
  );
}

export default SessionPicker
