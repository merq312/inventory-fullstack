import styled from 'styled-components';
import {
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const CardContentNoPadding = styled(CardContent)`
  padding: 12px;
  &:last-child {
    padding-bottom: 12px;
  }
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
        <Typography sx={{ px: 1 }} variant="body1" component="div">
          3
        </Typography>
        <Typography sx={{ flexGrow: 1 }} variant="body1" component="div">
          California
        </Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>-1</Button>
          <Button>0</Button>
          <Button>+1</Button>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInput;
