import { useEffect, useState } from 'react';
import { Message } from '@inventory-fullstack/api-interfaces';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory View
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {m.message}
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
