import { Avatar, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/system';

import avatarUrl from '@assets/avatar.jpg';
import SettingsSvg from '@assets/settings.svg?react';
import NotificationSvg from '@assets/notification.svg?react';

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  padding: 0,

  '&:hover': {
    color: theme.palette.secondary.main,
    transition: 'color 0.2s ease-in-out',
  },
}));

function MenuStack() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButtonStyled disabled size="large">
        <SettingsSvg />
      </IconButtonStyled>

      <IconButtonStyled disabled size="large">
        <NotificationSvg />
      </IconButtonStyled>

      <Avatar alt="Remy Sharp" src={avatarUrl} />
    </Stack>
  );
}

export default MenuStack;
