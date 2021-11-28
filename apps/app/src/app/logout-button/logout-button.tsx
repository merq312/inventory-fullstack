import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LogOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant='outlined'
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
