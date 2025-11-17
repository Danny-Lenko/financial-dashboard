import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const navigationRoutes = [
  { name: 'Overview', path: '/' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Categories', path: '/categories' },
  { name: 'Accounts', path: '/accounts', disabled: true },
  { name: 'Wallets', path: '/wallets', disabled: true },
];

const UnorderedList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  display: 'flex',
  gap: theme.spacing(1),
  margin: 0,
  padding: 0,
}));

interface NavigationLinkProps extends ButtonProps {
  to: string;
}

const NavigationLink = styled(Button)<NavigationLinkProps>(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  fontWeight: 500,

  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

function Navigation() {
  return (
    <nav>
      <UnorderedList>
        {navigationRoutes.map((route) => (
          <li key={route.name}>
            <NavigationLink
              disabled={route.disabled}
              component={NavLink}
              to={route.path}
              size="large"
            >
              {route.name}
            </NavigationLink>
          </li>
        ))}
      </UnorderedList>
    </nav>
  );
}

export default Navigation;
