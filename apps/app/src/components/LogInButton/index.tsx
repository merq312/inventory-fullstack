import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

export default function LogInButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button color="inherit" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
}
