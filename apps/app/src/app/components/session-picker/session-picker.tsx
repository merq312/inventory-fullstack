import { SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItem } from '../../pages/inventory-info';

type AppProps = {
  setSession: (arg0: keyof MenuItem) => void
}

const sessionDict = {
  MC: 'overnightCount',
  M: 'morningCount',
  A: 'afternoonCount',
  L1: 'leftoverCountOne',
  L2: 'leftoverCountTwo'
};

function SessionPicker({ setSession }: AppProps) {

  const handleChange = (event: SyntheticEvent, value: string | null) => {
    if (value) setSession(sessionDict[value as keyof typeof sessionDict] as keyof MenuItem);
  };

  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={Object.keys(sessionDict)}
      defaultValue={'MC'}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label='Session' />}
    />
  );
}

export default SessionPicker;
