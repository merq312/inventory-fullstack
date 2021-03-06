import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

export default function LogOutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      color="inherit"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
}
