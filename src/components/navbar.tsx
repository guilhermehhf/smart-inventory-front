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
      <AppBar position="static">
        <Toolbar>
          <Stack
            spacing={2}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ flexGrow: 1 }}
          >
            <Typography variant="h5">Smart Inventory</Typography>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{ bgcolor: "primary.light" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/register"
              sx={{ bgcolor: "primary.light" }}
            >
              Registro
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/estatisticas"
              sx={{ bgcolor: "primary.light" }}
            >
              Estatisticas
            </Button>

            
            <Button
              variant="contained"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ bgcolor: "primary.light" }}
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
              <MenuItem onClick={handleClose} component={Link} to="/produto/cadastrar">Cadastrar</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/produto/consultar">Consultar</MenuItem>
            </Menu>



            <Button
              variant="contained"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ bgcolor: "primary.light" }}
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
              <MenuItem onClick={handleClose} component={Link} to="venda/cadastrar">Cadastrar</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="venda/consultar">Consultar</MenuItem>
            </Menu>
            <Box sx={{ flexGrow: 1 }}></Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
