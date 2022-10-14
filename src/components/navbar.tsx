import {
  AppBar,
  Toolbar,
  Stack,
  Divider,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar elevation={24} position="static" sx={{ flexGrow: 1, bgcolor:'#80EACA' }}>
        <Toolbar>
          <Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
          <Typography variant="h5" color={'#000'}>Smart Inventory</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}
