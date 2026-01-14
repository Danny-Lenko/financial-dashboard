import DisabledElementTooltip from '@/components/common/DisabledElementTooltip/DisabledElementTooltip';
import { getNavigationRoutes } from '@/shared/utils/router.utils';
import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

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
    backgroundColor: theme.palette.action.selected,
  },
}));

function Navigation() {
  const routes = getNavigationRoutes();

  return (
    <nav>
      <UnorderedList>
        {routes.map((route) => {
          const listEl = (
            <li key={route.navigationLabel}>
              <NavigationLink
                disabled={route.disabled}
                component={NavLink}
                to={route.path ?? '#'}
                size="large"
              >
                {route.navigationLabel}
              </NavigationLink>
            </li>
          );

          if (route.disabled) {
            return <DisabledElementTooltip>{listEl}</DisabledElementTooltip>;
          }

          return listEl;
        })}
      </UnorderedList>
    </nav>
  );
}

export default Navigation;
