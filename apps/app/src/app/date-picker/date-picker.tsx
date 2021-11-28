import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { Box } from '@mui/material';

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ my: 2 }}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Stack spacing={3}>
          <MobileDatePicker
            label='Date'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}
