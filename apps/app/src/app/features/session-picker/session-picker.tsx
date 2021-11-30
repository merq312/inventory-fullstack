import { SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MenuItemCounts } from '../../pages/inventory-info';

type AppProps = {
  setSession: (arg0: keyof MenuItemCounts) => void
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
    if (value) setSession(sessionDict[value as keyof typeof sessionDict] as keyof MenuItemCounts);
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
