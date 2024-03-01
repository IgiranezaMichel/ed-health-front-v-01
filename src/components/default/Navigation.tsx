import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SideBarItem } from '../../typeDefs/SideBarItem';
import { Email, Person2 } from '@mui/icons-material';
type sideBar = {
  items: SideBarItem[]
  children: React.ReactNode,
  sideBarClass?: string,
  sideBarProfileClass?: string
}
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Navigation: React.FC<sideBar> = (items) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(String(localStorage.getItem("userData")));
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='text-dark' position="fixed" open={open}>
        <Toolbar className='bg-white'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className='w-100' component="div">
            <a className="navbar-brand text-black fw-bold" href="#"><i className="bi bi-droplet"></i>Ed<span className="text-info">HEALTH</span></a>
            <span className='float-end'>
              <div><Person2 /> {user.name}</div>
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <section className={open ? "bg-white border mb-3 text-center py-3" : "d-none"} style={{ filter: 'drop-shadow(2px 2px 8px black)' }}>
            <div className={items.sideBarProfileClass == '' ? 'card p-0 col-9 m-auto border-0' : "card p-0 col-10 m-auto border-0 " + items.sideBarProfileClass}>
              <img src={user.profilePicture} className="card-img" />
            </div>
            <div><Person2 /> {user.name}</div>
            <div><Email /> {user.email}</div>
          </section>
          {items.items.map((data, index) => (
            <a key={index} href={data.link} className='nav-link'>
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{ minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon  sx={{  minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    {data.MenuItemProps}
                  </ListItemIcon>
                  <ListItemText primary={data.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </a>
          ))}
        </List>
        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {items.children}
      </Box>
    </Box>
  );
}