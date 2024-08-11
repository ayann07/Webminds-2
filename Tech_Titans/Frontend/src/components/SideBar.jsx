import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import SecurityIcon from '@mui/icons-material/Security';
import { useAuth } from '../store/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { BASE_URL } from '../main';
const drawerWidth = 240;

const SideBar = () => {
  const [userName,setUsername]=useState("---------");
  const [ac,setAc]=useState("***********");
  const { authToken } = useAuth();

  const getDetails=async ()=>{
    try{
      const response=await fetch(`${BASE_URL}/auth/user`,{
        method:"GET",
        headers: {
          Authorization: authToken,
        }
      })
      if(response.ok){
        const data=await response.json()
        setUsername(data.user.username);
        const newRes=await fetch(`${BASE_URL}/account/bank/${data.user.banks[0]._id}`,{
          method:"GET",
          headers: {
            Authorization: authToken,
          }
        })
        if(newRes.ok){
          const bankData=await newRes.json();
          console.log(bankData);
          setAc(bankData.account.account_no);
        }
      }
      else{
        setAc("***********")
      }
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getDetails();
  },[getDetails])
  
  return (
    <Drawer
      className='sidebar'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          background: 'linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)',
          borderRight: '1px solid #fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List sx={{ padding:'16px', color:'#fff' }}>
        <ListItem 
          sx={{ marginBottom:'10' }} 
          component={Link} 
          to="/dashboard" 
          button 
        >
          <DashboardIcon sx={{ marginRight: '8px' }} />
          <ListItemText 
            primary="Dashboard" 
            primaryTypographyProps={{ 
              variant: 'h5', 
              fontWeight: 'bolder', 
              fontSize: '25px',
              fontFamily: 'Times New Roman'
            }} 
          />
        </ListItem>
        <br />
        <br />
        <Divider sx={{ backgroundColor: '#fff' }} />
        <ListItem>
          <ListItemText 
            primary="Customer Details" 
            primaryTypographyProps={{ 
              variant: 'h6',
              fontSize:'18px',
              fontWeight: 'bolder',
            }} 
          />
        </ListItem>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary="Name" primaryTypographyProps={{  
              fontWeight: 'bolder',
              fontSize:'18px',
              variant:'h6'
            }} />
          <ListItemText primary={userName} />
        </ListItem>
        <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText  primary="Account Number" primaryTypographyProps={{  
              fontWeight: 'bolder',
              fontSize:'18px',
              variant:'h6'
            }} />
          <ListItemText  primary={ac} />
        </ListItem>
        <br />
        <br />
        <Divider sx={{ backgroundColor: '#fff' }} />
        <ListItem component={Link} to="/security" button>
          <SecurityIcon sx={{ marginRight: '8px' }} />
          <ListItemText primary="Security Settings" />
        </ListItem>
        <ListItem component={Link} to="/contact-us" button>
          <InfoIcon sx={{ marginRight: '8px' }} />
          <ListItemText primary="Contact us" />
        </ListItem>
        <ListItem component={Link} to="/support" button>
          <ContactSupportIcon sx={{ marginRight: '8px' }} />
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem component={Link} to="/service" button>
          <HelpIcon sx={{ marginRight: '8px' }} />
          <ListItemText primary="Terms of Service" />
        </ListItem>
        <ListItem component={Link} to="/logout" button>
          <LogoutIcon sx={{ marginRight: '8px' }} />
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;






