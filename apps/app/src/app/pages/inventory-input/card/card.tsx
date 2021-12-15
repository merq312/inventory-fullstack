import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
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

function InventoryInputCard({ name, value, dispatch }: AppProps) {
  const [newValue, setNewValue] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleDecrement = () => {
    if (newValue - 1 >= 0) {
      setNewValue(newValue - 1);
      dispatch(newValue - 1);
    }
  };

  const handleReset = () => {
    setNewValue(value);
    dispatch(value);
  };

  const handleIncrement = () => {
    setNewValue(newValue + 1);
    dispatch(newValue + 1);
  };

  return (
    <Card sx={{ my: 1 }}>
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
          >
            {newValue}
          </InfoDiv>
          <InfoDiv>{value}</InfoDiv>
        </ButtonGroup>
        <Typography sx={{ flexGrow: 1, mx: 2 }} variant="body1" component="div">
          {name}
        </Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={handleDecrement} sx={{ width: 2 }}>
            -1
          </Button>
          <Button onClick={handleReset} sx={{ width: 2 }}>
            0
          </Button>
          <Button onClick={handleIncrement} sx={{ width: 2 }}>
            +1
          </Button>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInputCard;
