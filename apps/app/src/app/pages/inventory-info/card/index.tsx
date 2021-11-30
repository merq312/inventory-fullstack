import styled from 'styled-components';
import { Box, Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material';
import { menuItem } from '../index';

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
  item: menuItem
}

function InventoryInfoCard({ item }: AppProps) {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            alignSelf: 'start',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant='body1' component='div'>
            {item.name}
          </Typography>
        </Box>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'
          sx={{
            alignSelf: 'end',
            cursor: 'default'
          }}
        >
          <InfoDiv>{item.overnightCount}</InfoDiv>
          <InfoDiv>{item.morningCount}</InfoDiv>
          <InfoDiv>{item.afternoonCount}</InfoDiv>
          <InfoDiv>{item.leftoverCountOne}</InfoDiv>
          <InfoDiv>{item.leftoverCountTwo}</InfoDiv>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInfoCard;
