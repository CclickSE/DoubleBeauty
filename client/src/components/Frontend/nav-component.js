import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

import {
  Container,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material/";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from '@mui/icons-material/Logout';

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () => {
    AuthService.logout(); //清空localstorage
    alert("登出成功，即將回到登入頁面");
    setCurrentUser(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HomeIcon />
        </IconButton>
        <Link to="/" style={{textDecoration:"none", color:"black"}}><p>主頁</p></Link>
        
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <ListAltIcon />
        </IconButton>
        <p>歷史訂單</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ReceiptLongIcon />
          </Badge>
        </IconButton>
        <p>選購清單</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <Link to="/login" onClick={handleLogout} style={{textDecoration:"none", color:"black"}}><p>登出</p></Link>
      </MenuItem>
    </Menu>
  );

  

  return (
      <Box sx={{ flexGrow: 1, width: '100vw' }} >
        <AppBar position="static" sx={{ width: '100%' }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <p>XXX 客戶專屬頁面</p>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton size="large" aria-label="home" color="inherit">
                <Tooltip title="回主頁" placement="bottom">
                  <HomeIcon />
                </Tooltip>
              </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="history order"
                color="inherit"
              >
                <Tooltip title="歷史訂單" placement="bottom">
                  <ListAltIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new cartItem"
                color="inherit"
              >
                <Tooltip title="選購清單" placement="bottom" sx={{ fontSize: "10rem" }}> 
                  <Badge badgeContent={4} color="error">
                    <ReceiptLongIcon />
                  </Badge>
                </Tooltip>
              </IconButton>
              <Link to={"/login"} onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="logout"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                
                <Tooltip title="登出" placement="bottom">
                <LogoutIcon />
                </Tooltip>
              </IconButton>
              </Link>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    // <>
    //   <Link to="/">首頁</Link>
    //   {!currentUser && <Link to="/login">會員登入</Link>}
    //   {!currentUser && <Link to="/register">註冊會員</Link>}
    //   {currentUser && (
    //     <Link onClick={handleLogout} to="/login">
    //       登出
    //     </Link>
    //   )}
    //   {currentUser && currentUser.user.role == "admin" && (
    //     <Link to="/dashboard">後台</Link>
    //   )}
    //     <Link to="/product">商品頁面</Link>
    //     {currentUser && currentUser.user.role == "admin" && (
    //     <Link to="/postProduct">新增商品</Link>
    //   )}
    //   {currentUser && (
    //     <Link to="/placeOrder">訂購商品</Link>
    //   )}
    // </>
  );
};

export default NavComponent;
