import { Box } from '@mui/material';
import { styled } from '@mui/system';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeaderInner = styled('header')(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  minHeight: 64,
  padding: theme.spacing(3, 2),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <HeaderWrapper>
      <HeaderInner>{children}</HeaderInner>
    </HeaderWrapper>
  );
}
