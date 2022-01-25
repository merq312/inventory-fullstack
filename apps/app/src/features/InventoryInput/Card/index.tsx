import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

type AppProps = {
  name: string;
  value: number;
  dispatch: (arg0: number) => void;
};

const CardContentNoPadding = styled(CardContent)`
  padding: 0.6rem 0.8rem;

  &:last-child {
    padding-bottom: 0.6rem;
  }
`;

const InfoDiv = styled(Button)`
  cursor: default;
  min-width: 0;
`;

export default function InventoryInputCard({
  name,
  value,
  dispatch,
}: AppProps) {
  const [newValue, setNewValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  return (
    <Card sx={{ my: 1 }} data-cy={name.toLowerCase().replaceAll(' ', '-')}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <InfoDiv>{value}</InfoDiv>
          <InfoDiv
            sx={{
              color: () =>
                newValue !== value ? 'white' : theme.palette.primary.main,
              backgroundColor: () =>
                newValue > value
                  ? theme.palette.success.light
                  : newValue < value
                  ? theme.palette.error.light
                  : 'white',
              '&:hover': {
                color: () =>
                  newValue > value
                    ? theme.palette.success.main
                    : newValue < value
                    ? theme.palette.error.main
                    : theme.palette.primary.main,
              },
            }}
            data-cy="new-value"
          >
            {newValue - value >= 0
              ? `+${newValue - value}`
              : `${newValue - value}`}
          </InfoDiv>
        </ButtonGroup>
        <Typography sx={{ flexGrow: 1, mx: 2 }} variant="body1" component="div">
          {name}
        </Typography>
        <TextField
          sx={{
            width: '4rem',
            minWidth: '4rem',
          }}
          type="number"
          variant="outlined"
          value={newValue}
          onBlur={() => {
            if (newValue !== value) {
              dispatch(newValue);
            }
          }}
          onChange={(e) => {
            const spinBoxValue = parseInt(e.target.value);
            if (!isNaN(spinBoxValue) && spinBoxValue >= 0) {
              setNewValue(spinBoxValue);
            }
          }}
          inputProps={{
            style: {
              padding: 5,
              paddingLeft: 10,
            },
          }}
        />
      </CardContentNoPadding>
    </Card>
  );
}
