import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';
import type { Shadows } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    ...colors,
  },
  typography: {
    ...typography,
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.08)',
    '0 2px 4px rgba(0, 0, 0, 0.06)',
    '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05)',
    '0 3px 5px rgba(0, 0, 0, 0.08), 0 3px 5px rgba(0, 0, 0, 0.08)',
    '10px 15px 60px rgba(0, 0, 0, 0.25)',
    ...Array(20).fill('none'),
  ] as Shadows,
});

export default theme;
