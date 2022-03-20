// import React from 'react';
// import { AppBar, MenuItem, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box } from '@mui/material';
// // import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const NavBar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               {/* <MenuIcon /> */}
//               <Link to="/">Logo</Link>
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default NavBar;
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  NavLink,
  withRouter,
} from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import { actions } from "../../actions/actions"

// import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  appbar: {
    backgroundColor: "#e5ffff",
    color: "#49599a",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
    color: "#e5ffff",
  },
  navTitle: {
    color: "#541a8b",
    textDecoration: "none",
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly",
  },
  activeTitle: {
    flexGrow: 1,
    color: "#bb4d00",
    fontWeight: "bold",
    textDecoration: "none",
  },
  logOut: {
    // flexGrow: 1,
    // color: "#49599a",
    color: "#541a8b",
  },
}));

function NavBar(props) {
  //   let history = useHistory();
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducers.user);
  const isLoggeIn = useSelector((state) => state.reducers.loggedIn);
  const isAuthAllowed = useSelector((state) => state.reducers.isAuthAllowed);
  console.log(user, isLoggeIn);
  const [authAllowed, setauthAllowed] = useState(isAuthAllowed)
  useEffect(() => {
    setauthAllowed(isAuthAllowed)
  }, [isAuthAllowed])
  console.log("isAuthAllowed", isAuthAllowed, " ", authAllowed);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  //   const handleButtonClick = (pageURL) => {
  //     history.push(pageURL);
  //   };

  const menuItems = [
    {
      menuId: "339",
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuId: "322",

      menuTitle: "OPD Profile",
      pageURL: "/profile",
    },
    {
      menuId: "333",
      menuTitle: "Book Patients",
      pageURL: "/patient",
    },
    // {
    //     menuId:"345",
    //   menuTitle: "LogIn",
    //   pageURL: "/LogIn",
    // },
    // {
    //     menuId:"365",
    //   menuTitle: "SignUp",
    //   pageURL: "/SignUp",
    // },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          {!isMobile ? (<Typography variant="h6" className={classes.title}>
            <NavLink
              to="/"
              exact
              activeClassName={classes.activeTitle}
              className={classes.navTitle}
            >
              Home
            </NavLink>
          </Typography>) : null}

          {isMobile ? (
            <>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {menuItems.map((menuItem) => {
                      const { menuId, menuTitle, pageURL } = menuItem;
                      return (
                        <MenuItem key={menuId} onClick={() => handleMenuClick(pageURL)}>
                          {menuTitle}
                        </MenuItem>
                      );
                    })}
                    {isLoggeIn && isAuthAllowed ? (
                      <MenuItem
                        // variant="h6"
                        // className={classes.logOut}
                        onClick={() => dispatch(actions.logout())}
                      >
                        LogOut
                      </MenuItem>
                    ) : (
                      <MenuItem style={{ display: isAuthAllowed ? 'none' : 'inline-block' }} onClick={() => handleMenuClick("/LogIn")}>{"Log In "}</MenuItem>
                    )}
                  </Menu>
                </Grid>
                <Grid item>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <Avatar alt="Remy Sharp" style={{ backgroundColor: "#FF5722" }} >
                      B
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {menuItems.map((menuItem) => {
                      const { menuId, menuTitle, pageURL } = menuItem;
                      return (
                        <MenuItem key={menuId} onClick={() => handleMenuClick(pageURL)}>
                          {menuTitle}
                        </MenuItem>
                      );
                    })
                    }
                    {isLoggeIn && isAuthAllowed ? (
                      <MenuItem
                        // variant="h6"
                        // className={classes.logOut}
                        onClick={() => dispatch(actions.logout())}
                      >
                        LogOut
                      </MenuItem>
                    ) : (
                      <MenuItem style={{ display: isAuthAllowed ? 'none' : 'inline-block' }} onClick={() => handleMenuClick("/LogIn")}>{"Log In "}</MenuItem>
                    )}
                  </Menu>
                </Grid>
              </Grid>
            </>
          ) : (
            <div className={classes.headerOptions}>
              <Typography variant="h6" className={classes.title}>
                <NavLink
                  to="/profile"
                  activeClassName={classes.activeTitle}
                  className={classes.navTitle}
                >
                  OPD Profile
                </NavLink>
              </Typography>
              <Typography variant="h6" className={classes.title}>
                <NavLink
                  to="/patient"
                  activeClassName={classes.activeTitle}
                  className={classes.navTitle}
                >
                  Book Patients
                </NavLink>
              </Typography>
              {isLoggeIn && isAuthAllowed ? (
                <Typography
                  variant="h6"
                  className={classes.logOut}
                  onClick={() => dispatch(actions.logout())}
                >
                  LogOut
                </Typography>
              ) : (
                <>
                  {authAllowed && <>
                    <Typography style={{ display: isAuthAllowed ? 'none' : 'inline-block' }} variant="h6" className={classes.title}>
                      <NavLink
                        to="/LogIn"
                        activeClassName={classes.activeTitle}
                        className={classes.navTitle}
                      >
                        LogIn
                      </NavLink>
                    </Typography>
                    <Typography style={{ display: isAuthAllowed ? 'none' : 'inline-block' }} variant="h6" className={classes.title}>
                      <NavLink
                        to="/SignUp"
                        activeClassName={classes.activeTitle}
                        className={classes.navTitle}
                      >
                        SignUp
                      </NavLink>
                    </Typography>
                  </>}
                </>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div >
  );
}

export default withRouter(NavBar);
