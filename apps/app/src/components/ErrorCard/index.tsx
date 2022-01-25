import styled from 'styled-components';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { useContext } from 'react';
import { StoreContext } from '../../providers';

const CardContentNoPadding = styled(CardContent)`
  padding: 0.6rem 0.8rem;

  &:last-child {
    padding-bottom: 0.6rem;
  }
`;

type AppProps = {
  msg: string;
};

export default function ErrorCard({ msg }: AppProps) {
  const { setDrawer } = useContext(StoreContext);

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
          {msg ? (
            msg === '__store' ? (
              <span>
                Please{' '}
                <Link
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setDrawer(true)}
                >
                  select
                </Link>{' '}
                a store.
              </span>
            ) : (
              msg
            )
          ) : (
            'Something went wrong :('
          )}
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
}
