import styled from 'styled-components';
import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { menuItem } from '../../inventory-info';
import { useEffect, useState } from 'react';

type AppProps = {
  item: menuItem;
  session: string
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

function InventoryInputCard({ item, session }: AppProps) {
  const [itemValue, setItemValue] = useState(0);
  const [newItemValue, setNewItemValue] = useState(0);

  useEffect(() => {
    switch (session) {
      case 'MC':
        setItemValue(item.overnightCount);
        break;
      case 'M':
        setItemValue(item.morningCount);
        break;
      case 'A':
        setItemValue(item.afternoonCount);
        break;
      case 'L1':
        setItemValue(item.leftoverCountOne);
        break;
      case 'L2':
        setItemValue(item.leftoverCountTwo);
        break;
    }
  }, [session, item]);

  useEffect(() => {
    setNewItemValue(itemValue)
  }, [itemValue])

  const handleDecrement = () => {
    if (newItemValue - 1 >= 0) {
      setNewItemValue(newItemValue - 1)
    }
  }

  const handleReset = () => {
    setNewItemValue(itemValue)
  }

  const handleIncrement = () => {
    setNewItemValue(newItemValue + 1)
  }

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
          <InfoDiv>{newItemValue}</InfoDiv>
          <InfoDiv>{itemValue}</InfoDiv>
        </ButtonGroup>
        <Typography sx={{ flexGrow: 1 }} variant='body1' component='div'>
          {item.name}
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
