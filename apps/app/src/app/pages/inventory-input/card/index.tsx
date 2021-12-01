import styled from 'styled-components';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type AppProps = {
  name: string;
  value: number;
  dispatch: (arg0: number) => void;
}

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

  useEffect(() => {
    setNewValue(value)
  }, [value])

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
          alignItems: 'center'
        }}
      >
        <ButtonGroup
          variant='outlined'
          aria-label='outlined primary button group'
          sx={{ mr: 0.6 }}
        >
          <InfoDiv>{newValue}</InfoDiv>
          <InfoDiv>{value}</InfoDiv>
        </ButtonGroup>
        <Typography sx={{ flexGrow: 1 }} variant='body1' component='div'>
          {name}
        </Typography>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
        >
          <Button onClick={handleDecrement} sx={{ width: 2 }}>-1</Button>
          <Button onClick={handleReset} sx={{ width: 2 }}>0</Button>
          <Button onClick={handleIncrement} sx={{ width: 2 }}>+1</Button>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInputCard;
