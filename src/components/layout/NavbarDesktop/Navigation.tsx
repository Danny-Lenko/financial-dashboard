import { Link } from '@mui/material';

const navigationRoutes = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navigation() {
  return (
    <nav>
      <ul>
        {navigationRoutes.map((route) => (
          <li key={route.name}>
            <Link href={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
