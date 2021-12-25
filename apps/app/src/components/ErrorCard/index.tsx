import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';

const CardContentNoPadding = styled(CardContent)`
  padding: 0.6rem 0.8rem;

  &:last-child {
    padding-bottom: 0.6rem;
  }
`;

type AppProps = {
  msg: string;
};

function ErrorCard({ msg }: AppProps) {
  return (
    <Card sx={{ my: 1 }}>
      <CardContentNoPadding
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" component="div">
          {msg ? msg : 'Something went wrong :('}
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
}

export default ErrorCard;
