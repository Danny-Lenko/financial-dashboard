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
          const link = (
            <NavigationLink
              disabled={route.disabled}
              component={NavLink}
              to={route.path ?? '#'}
              size="large"
            >
              {route.navigationLabel}
            </NavigationLink>
          );

          if (route.disabled) {
            return (
              <li key={route.navigationLabel}>
                <DisabledElementTooltip>{link}</DisabledElementTooltip>
              </li>
            );
          }

          return <li key={route.navigationLabel}>{link}</li>;
        })}
      </UnorderedList>
    </nav>
  );
}

export default Navigation;
