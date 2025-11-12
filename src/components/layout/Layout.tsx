import { Outlet } from 'react-router-dom';
import NavbarDesktop from './NavbarDesktop/NavbarDesktop';

function Layout() {
  return (
    <div>
      <NavbarDesktop />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
