import styled from 'styled-components';
import { Button, ButtonGroup, Card, CardContent} from '@mui/material';

const CardContentNoPadding = styled(CardContent)`
  padding: 0.6rem 0.8rem;

  &:last-child {
    padding-bottom: 0.6rem;
  }
`;

const InfoDiv = styled(Button)`
  cursor: default;
  width: 3rem;
`;

function InventoryInfoHeader() {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center'
        }}
      >
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
        >
          <InfoDiv>MC</InfoDiv>
          <InfoDiv>M</InfoDiv>
          <InfoDiv>A</InfoDiv>
          <InfoDiv>L1</InfoDiv>
          <InfoDiv>L2</InfoDiv>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInfoHeader;
