import { SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type AppProps = {
  setSession: (arg0: string) => void
}

function SessionPicker({ setSession }: AppProps) {

  const handleChange = (event: SyntheticEvent, value: string | null) => {
    if (value) setSession(value);
  };

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={['MC', 'M', 'A', 'L1', 'L2']}
      defaultValue={'MC'}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label='Session' />}
    />
  );
}

export default SessionPicker;
