import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import {onValue, ref} from 'firebase/database';
import {database} from '../Firebase';

export const Common = (props) => {
  const [userData, setUserData] = useState([]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const settings = ['Logout'];
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
    if (uid) {
      onValue(ref(database, 'users/' + uid), (snapshot) => {
        const data = snapshot.val() || {};
        setUserData(data);
      });
    }
  }, []);

  const handleSetting = (setting) => {
    if (setting === 'Logout') {
      localStorage.clear()||sessionStorage.clear();
      setLoading(true);
      setTimeout(() => {
        navigate('/Login');
        setLoading(false);
      }, 1000);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Tooltip
        title={`${userData?.firstName || ''} ${userData?.lastName || ''}`}
      >
        <Avatar
          sx={{
            cursor: 'pointer',
            backgroundColor: userData.avatarColor,
            color: '#ffffff',
          }}
          onClick={handleOpenUserMenu}>
          {userData?.firstName?.[0] || ''}{userData?.lastName?.[0] || ''}
        </Avatar>
      </Tooltip>
      <Menu
        sx={{
          'mt': '45px',
          '& .MuiMenu-list': {
            padding: '5px',
            backgroundColor: 'background.default',
          },
          '& .MuiMenu-paper': {
            width: '300px',
            borderRadius: '10px',
          },
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box
          sx={{
            display: 'flex',
            padding: '10px',
          }}
        >
          <Avatar
            sx={{
              cursor: 'pointer',
              backgroundColor: userData.avatarColor,
              color: '#ffffff',
              marginTop: '5px',
            }}
            onClick={handleOpenUserMenu}>
            {userData?.firstName?.[0] || ''}{userData?.lastName?.[0] || ''}
          </Avatar>
          <Box
            sx={{
              marginLeft: '10px',
            }}>
            <Typography
              variant='h5'
            >
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography
              variant='body2'
            >
              {userData.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={handleCloseUserMenu}
            sx={{
              marginTop: '5px',
            }}
          >
            <Typography onClick= {()=>{
              handleSetting(setting);
            }} width='100%' textAlign="left">
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <Dialog open={loading}>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}>
          <CircularProgress />
          <Typography
            variant='h6'
            sx={{
              marginTop: '10px',
              color: 'text.primary',
            }}
          >
            Logging Out...
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};
