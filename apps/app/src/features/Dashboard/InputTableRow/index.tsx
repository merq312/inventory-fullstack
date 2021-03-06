import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

type AppProps = {
  placeholder: string;
  error: boolean;
  close: () => void;
  dispatch: (arg0: string) => void;
  cellOneText?: string;
};

export default function InputTableRow({
  placeholder,
  error,
  close,
  dispatch,
  cellOneText,
}: AppProps) {
  const [value, setValue] = useState('');

  return (
    <TableRow>
      {cellOneText && <TableCell>{cellOneText}</TableCell>}
      <TableCell
        sx={{
          p: 0,
          pl: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Input
          sx={{ fontSize: '1rem', flexGrow: 1 }}
          error={error}
          size="small"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <IconButton
          onClick={() => {
            if (value) {
              dispatch(value);
            }
          }}
        >
          <SendIcon />
        </IconButton>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
