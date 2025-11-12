import { Link } from '@mui/material';

import Header from './Header';
import logo from '@assets/logo.svg';

function NavbarDesktop() {
  return (
    <>
      <Header>
        <Link href="/">
          <img style={{ display: 'block' }} src={logo} alt="Financy logo" />
        </Link>
        <nav>Header Content</nav>
      </Header>
    </>
  );
}

export default NavbarDesktop;
