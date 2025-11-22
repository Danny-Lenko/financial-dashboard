import { Outlet } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import { styled } from '@mui/system';
import { Suspense } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

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
      <Suspense
        fallback={
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <Main>
          <Outlet />
        </Main>
      </Suspense>
    </div>
  );
}

export default Layout;
