import styled from 'styled-components';
import {
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

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

function InventoryInfo() {
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
            Supreme Family Pack
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
          <InfoDiv>0</InfoDiv>
          <InfoDiv>0</InfoDiv>
          <InfoDiv>0</InfoDiv>
          <InfoDiv>0</InfoDiv>
          <InfoDiv>0</InfoDiv>
        </ButtonGroup>
      </CardContentNoPadding>
    </Card>
  );
}

export default InventoryInfo;
