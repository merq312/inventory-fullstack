import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <CssBaseline />
    <Auth0Provider
      domain="dev-iukg50h5.us.auth0.com"
      clientId="rMtJbuwc5EuwLuOLMs7Vn96UyMcU0ekN"
      audience="https://mighty-atoll-05391.herokuapp.com/api"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
  document.getElementById('root')
);
