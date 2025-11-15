import { Link } from '@mui/material';

import logoUrl from '@assets/logo.svg';
import Header from './Header';
import Navigation from './Navigation';
import MenuStack from './MenuStack';

function NavbarDesktop() {
  return (
    <>
      <Header>
        <Link href="/">
          <img style={{ display: 'block' }} src={logoUrl} alt="Financy logo" />
        </Link>
        <Navigation />
        <MenuStack />
      </Header>
    </>
  );
}

export default NavbarDesktop;
