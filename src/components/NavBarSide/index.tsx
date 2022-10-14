import React from "react";
import { AppBar, Button, CssBaseline, Divider, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "./styles.css";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from "../navbar"

export const NavBar: React.FunctionComponent = () => {
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
      <CssBaseline />
      <Navbar></Navbar>
      <Box display="flex" flexDirection="row" className="root" flexGrow={1} >
        <AppBar elevation={1} position="sticky" sx={{ top:'0', flexGrow: 1, flexBasis: '218px', maxWidth: '218px', bgcolor: '#80EACA'}}>
          <Toolbar >
            <Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
              <Button variant="contained" component={Link} to="/login" sx={{bgcolor:'#16D89D', color: '#000'}}>
                Login
              </Button>
              <Button variant="contained" component={Link} to="/register" sx={{bgcolor:'#16D89D', color: '#000'}}>
                Registro
              </Button>
              <Button variant="contained" component={Link} to="/estatisticas" sx={{bgcolor:'#16D89D', color: '#000'}}>
                Estatisticas
              </Button>

              <Button
                variant="contained"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{bgcolor:'#16D89D', color: '#000'}}
              >
                Produtos
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/produto/cadastrar"
                >
                  Cadastrar
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/produto/consultar"
                >
                  Consultar
                </MenuItem>
              </Menu>

              <Button
                variant="contained"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{bgcolor:'#16D89D', color: '#000'}}
              >
                Vendas
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="venda/cadastrar"
                >
                  Cadastrar
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="venda/consultar"
                >
                  Consultar
                </MenuItem>
              </Menu>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ flexGrow: 1, bgcolor: "primary.dark" }}
              >
                <Typography>dev</Typography>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </div>
  );
}
