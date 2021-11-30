import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

type AppProps = {
  setDate: (arg0: string) => void
}

export default function DatePicker({ setDate }: AppProps) {
  const [value, setValue] = useState<Date | null>(
    new Date()
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (newValue) setDate(dayjs(newValue).format('YYYY-MM-DD'))
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
