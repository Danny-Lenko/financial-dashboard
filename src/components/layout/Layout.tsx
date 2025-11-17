import { Outlet } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import { styled } from '@mui/system';

const Main = styled('main')(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  padding: theme.spacing(7, 2),
  marginLeft: 'auto',
  marginRight: 'auto',
}));

function Layout() {
  return (
    <div>
      <NavbarDesktop />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default Layout;
