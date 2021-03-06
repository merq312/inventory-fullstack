import styled from 'styled-components';
import { Button, ButtonGroup, Card, CardContent } from '@mui/material';
import { ItemTotals } from '../types';

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

type AppProps = {
  totals: ItemTotals;
};

export default function InventoryInfoHeader({ totals }: AppProps) {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <InfoDiv>MC</InfoDiv>
          <InfoDiv>M</InfoDiv>
          <InfoDiv>A</InfoDiv>
          <InfoDiv>L1</InfoDiv>
          <InfoDiv>L2</InfoDiv>
        </ButtonGroup>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <InfoDiv>{totals.overnightCount}</InfoDiv>
          <InfoDiv>{totals.morningCount}</InfoDiv>
          <InfoDiv>{totals.afternoonCount}</InfoDiv>
          <InfoDiv>{totals.leftoverCountOne}</InfoDiv>
          <InfoDiv>{totals.leftoverCountTwo}</InfoDiv>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}
