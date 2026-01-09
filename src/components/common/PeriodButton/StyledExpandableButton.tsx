import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const StyledExpandableButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderColor: theme.palette.divider,
  padding: theme.spacing(0.7, 2),

  '&:hover': {
    borderColor: theme.palette.divider,
  },

  '&:focus': {
    outline: 'none',
  },

  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.selected,
  },

  svg: {
    marginRight: theme.spacing(0.5),
    transform: 'translateY(-1px)',
  },
}));
