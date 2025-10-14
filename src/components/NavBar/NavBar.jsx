import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = [
    { label: 'Personajes', path: '/personajes' },
    { label: 'Lugares', path: '/localizacion' },
    { label: 'Episodios', path: '/episodios' },
  ];

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#FFDE00', color: '#000' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Simpsonfont, Arial Black, sans-serif',
              letterSpacing: 1,
            }}
          >
            Simpsons APIs
          </Typography>

          {/* Botones para escritorio */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Simpsonfont, Arial Black, sans-serif',
                  '&:hover': {
                    backgroundColor: '#fff176',
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Icono hamburguesa para móvil */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Popover centrado para móvil */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            backgroundColor: '#fff8c6',
            border: '2px solid #FFDE00',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            padding: 1,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleClose}
                sx={{
                  fontWeight: 'bold',
                  fontFamily: 'Simpsonfont, Arial Black, sans-serif',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#fff176',
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default NavBar;