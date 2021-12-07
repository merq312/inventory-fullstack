import styled from 'styled-components';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { MenuItem } from '../index';

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
  item: MenuItem;
};

function InventoryInfoCard({ item }: AppProps) {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            alignSelf: 'start',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ flexGrow: 1 }} variant="body1" component="div">
            {item.name}
          </Typography>
        </Box>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{
            alignSelf: 'end',
            cursor: 'default',
          }}
        >
          <InfoDiv sx={{ backgroundColor: '#2196f3' }}>
            {item.overnightCount}
          </InfoDiv>
          <InfoDiv sx={{ backgroundColor: '#1e88e5' }}>
            {item.morningCount}
          </InfoDiv>
          <InfoDiv sx={{ backgroundColor: '#1976d2' }}>
            {item.afternoonCount}
          </InfoDiv>
          <InfoDiv sx={{ backgroundColor: '#1565c0' }}>
            {item.leftoverCountOne}
          </InfoDiv>
          <InfoDiv sx={{ backgroundColor: '#0d47a1' }}>
            {item.leftoverCountTwo}
          </InfoDiv>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInfoCard;
