import styled from 'styled-components';
import {
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const CardContentNoPadding = styled(CardContent)`
  padding: 0.6rem 0.8rem;
  &:last-child {
    padding-bottom: 0.6rem;
  }
`;

const InfoDiv = styled(Button)`
  cursor: default;
  min-width: 0;
  margin-right: 0.6rem;
`;

function InventoryInput() {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <InfoDiv variant="outlined">3</InfoDiv>
        <Typography sx={{ flexGrow: 1 }} variant="body1" component="div">
          California
        </Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button sx={{ width: 2 }}>-1</Button>
          <Button sx={{ width: 2 }}>0</Button>
          <Button sx={{ width: 2 }}>+1</Button>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInput;
