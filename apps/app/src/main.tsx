import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
  document.getElementById('root')
);
