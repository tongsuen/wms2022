import * as React from 'react';

import {connect} from 'react-redux'
import {Link, Redirect,useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'

import { styled, useTheme,ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const';
import {loadUser,logout} from '../../actions/auth'

import {list_alert_customer,list_alert_staff,set_read_alert} from '../../actions/manager'
import logo from '../../resource/images/menu/08logo@1x.png';
import ring from '../../resource/images/menu/09noti@1x.png';
import takePhoto from '../../resource/images/menu/10picuser@1x.png';
import profile from '../../resource/images/menu/01data@1x.png';
import message from '../../resource/images/menu/02mess@1x.png';
import warehouse from '../../resource/images/menu/03wareh@1x.png';
import stockout from '../../resource/images/menu/04issu@1x.png';
import graph_icon from '../../resource/images/menu/icongraph.png';
import status from '../../resource/images/menu/05status@1x.png';
import time from '../../resource/images/menu/06time@1x.png';
import logout_icon from '../../resource/images/menu/iconlogout.png';
import logout_icon2 from '../../resource/images/menu/iconlogout2.png';
import notes_icon from '../../resource/images/menu/12notes.png';
import report from '../../resource/images/menu/07report@1x.png';
import inventory_icon from '../../resource/images/staff/icon01.png';
import inbox_admin_icon from '../../resource/images/staff/admin/01@1x.png';
import cust_icon from '../../resource/images/staff/admin/02@1x.png';
import warehouse_icon from '../../resource/images/staff/admin/03@1x.png';
import recieve_icon from '../../resource/images/staff/admin/04@1x.png';
import issue_icon from '../../resource/images/staff/admin/05@1x.png';
import report_icon from '../../resource/images/staff/admin/06@1x.png';
import admin_icon from '../../resource/images/staff/admin/07@1x.png';
import camera_icon from '../../resource/images/staff/admin/10picpro.png';
const drawerWidth = 270;
const drawerHeight = 120;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Landing  = ({children,auth,alert,logout,list_alert_customer,list_alert_staff,set_read_alert}) =>  {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open_alert = Boolean(anchorEl);
  const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
      
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    const res = await set_read_alert({admin:auth.user.admin})
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const history = useHistory();

  
  const none_select =    
  <Grid  style={{height:drawerHeight,width:30,backgroundColor:COLOR.white,borderColor:COLOR.black,borderWidth:2,borderStyle:'solid',borderTopWidth:1,borderBottomWidth:1}}>
    
  </Grid>
  const none_select_first =    
    <Grid  style={{height:drawerHeight,width:30,backgroundColor:COLOR.white,borderColor:COLOR.black,borderWidth:2,borderStyle:'solid',borderTopWidth:0,borderBottomWidth:1}}>
      
    </Grid>
  const select_side = 
    <Grid style={{backgroundColor:COLOR.dark_green,height:drawerHeight,width:30,position:"relative",borderColor:COLOR.black,borderWidth:2,borderStyle:'solid',borderTopWidth:1,borderBottomWidth:1}}>
      <Box style={{borderRadius:"50%",top:"38%",width:26,height:26,backgroundColor:COLOR.white,position:"absolute"}}></Box>
      <Box style={{borderRadius:"50%",top:50,left:5.5,width:15,height:15,backgroundColor:COLOR.dark_green,position:"absolute"}}></Box>
    </Grid>
  const select_side_normal = 
     <Grid style={{backgroundColor:COLOR.brown,height:drawerHeight,width:30,position:"relative",borderColor:COLOR.black,borderWidth:2,borderStyle:'solid',borderTopWidth:1,borderBottomWidth:1}}>
       <Box style={{borderRadius:"50%",top:"38%",width:26,height:26,backgroundColor:COLOR.white,position:"absolute"}}></Box>
       <Box style={{borderRadius:"50%",top:50,left:5.5,width:15,height:15,backgroundColor:COLOR.brown,position:"absolute"}}></Box>
     </Grid>
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(async () => {

   // console.log("AUTH: >>>");
   // console.log(auth);

  console.log(location.pathname)
    if(location.pathname == '/profile'|| location.pathname == '/admin_create_inbox'){
        setCurrentPage(1)
    }
    else if(location.pathname == '/list_inbox' || location.pathname == '/admin_customer'){
      setCurrentPage(2)
    }
    else if(location.pathname == '/current_stocks'|| location.pathname == '/admin_warehouse_manager'){
      setCurrentPage(3)
    }
    else if(location.pathname == '/action_stocks' || location.pathname == '/admin_current_stocks'){
      setCurrentPage(4)
    }
    else if(location.pathname == '/stocks_out_status' || location.pathname == '/admin_import_stocks'){
      setCurrentPage(5)
    }
    else if(location.pathname == '/stocks_in_out_list' || location.pathname == '/admin_export_stocks'){
      setCurrentPage(6)
    }
    else if(location.pathname == '/customer_report' || location.pathname == '/admin_report'){
      setCurrentPage(7)
    }
    else if(location.pathname == '/chart' || location.pathname == '/admin_manage_staff'){
      setCurrentPage(8)
    }else if(location.pathname == '/note_list'){
      setCurrentPage(9)
    }
    try {

      if(auth.user.admin){
        const res = await list_alert_staff();
        
      }else{
        const res = await list_alert_customer();
       
      }
         
      }catch(err){
          console.log(err);
          
    }
  },[location]);
  
  React.useEffect(async () => {

    console.log('reload page :');
    try {

      if(auth.user.admin){
        const res = await list_alert_staff();
       
      }else{
        const res = await list_alert_customer();
       
      }
         
      }catch(err){
          console.log(err);
          
    }
  },[auth.user]);
  React.useEffect(()=>{
    console.log('alert from socket io')

    console.log(alert)
  },[alert])
  if(auth.isAuthenticated){
    return (
        <Box sx={{ display: 'flex',marginBottom:50}}>
          <CssBaseline />
            {(auth.user && auth.user.admin) ? <>
            
            <AppBar position="fixed" style={{backgroundColor:COLOR.dark_green ,borderWidth:2,borderStyle:'solid',borderColor:'black'}} open={open}>
              <Toolbar style={{paddingRight:0,overflow:'hidden'}}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={3} >
                    <Grid item sm={2} >
                      <Box style={{marginTop:10}}>
                      <img
                        src={logo}
                        width='40'
                        height='40'
                        loading="lazy"
                      />
                      </Box>
                 
                    </Grid>
                    <Grid item sm={6}>
                    </Grid>
                    <Grid item sm={1} style={{paddingLeft:0}} >
                      <Box style={{marginTop:13,textAlign:'right',paddingRight:30}}  onClick={handleClickListItem}>
                  
                       {alert.count == 0 ?    
                            <img
                            onClick={handleMenuItemClick}
                              src={ring}
                              width='40'
                              height='40'
                              loading="lazy"
                            />
                          :
                          <Box style={{position:'relative'}} onClick={handleMenuItemClick} >
                            <img
                              src={ring}
                              width='40'
                              height='40'
                              loading="lazy"
                            />
                            <Box style={{position:"absolute",top:'-8px',right:'-10px',border:'1.5px solid black',borderRadius:20,width:24,height:24,fontSize:14,
                              fontFamily:'kanit-medium',backgroundColor:'#c8553e',textAlign:'center'}}>{alert.count}</Box>
                          </Box>
                          }
                          
                      </Box>
                      <Menu
                              id="lock-menu"
                              anchorEl={anchorEl}
                              open={open_alert}
                              onClose={handleClose}
                              MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                              }}
                            >
                                <List sx={{ width: '100%', width: 360, bgcolor: 'background.paper' }}>
                                {alert && alert.list.map((option, index) => (
                                  <>
                                    <ListItem alignItems="flex-start"  key={option._id} style={{alignItems:'center'}} onClick={(event) => {
                                      
                                        if(option.type == 1 || option.type == 2){
                                          console.log("click")
                                           history.replace({pathname:'/detail_inbox',state:{inbox_id:option.inbox}})
                                        }
                                        else {
                                          history.replace({pathname:'/admin_requests'})
                                        }
                                        setAnchorEl(null);
                                        }
                                      }>
                                      <ListItemAvatar>
                                        {option.by_user && <Avatar alt="Avatar" src={option.by_user.avatar} />}
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={option.subject}
                                        primaryTypographyProps={{fontFamily:'kanit-regular',fontSize:18}}
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              sx={{ display: 'inline' }}
                                              component="span"
                                              variant="body2"
                                              color="text.primary"
                                              style={{fontFamily:'kanit-regular',fontSize:16}}
                                            >
                                              {option.by_user && option.by_user.name} {', '}
                                            </Typography>
                                            <Typography
                                              sx={{ display: 'inline' }}
                                              component="span"
                                              variant="body2"
                                              color={COLOR.green}
                                              style={{fontFamily:'kanit-regular',fontSize:16}}
                                            >
                                            {option.detail.length > 60 ? option.detail.slice(0,60): option.detail}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                      />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    </>
                                    ))}
                                     <ListItem key='view_alert' style={{justifyContent:'right'}} onClick={(event) => {
                                       
                                       history.replace('/alert_list/')
                                       
                                       setAnchorEl(null);
                                     }}>
                                         <button
                                             style={{textAlign:'right',backgroundColor:COLOR.white,borderWidth:0,color:COLOR.peach, display: 'inline',fontFamily:"kanit-regular" }}
                                                                            
                                           >
                                            view all
                                           </button>
                                    </ListItem>
                                    
                                </List>

                             
                          </Menu>
                    </Grid>
                    <Grid item sm={3} style={{backgroundColor:COLOR.mint,height:88,borderLeft:'2px solid black'}} onClick={()=>history.replace({pathname:'/profile'})} >
                      <Grid container>
                        <Grid justify = "center" style={{width:40}}>
                      {auth.user && 
                        auth.user.avatar ?   
                          <img
                            src={auth.user.avatar}
                            width='40'
                            height='40'
                            loading="lazy"
                            style={{marginTop:12,objectFit:"cover",borderRadius:20}}
                          />:
                          <img
                          src={camera_icon}
                          width='40'
                          height='40'
                          loading="lazy"
                          style={{marginTop:12}}
                        />
                      }
                        </Grid>
                       <Grid justify = "center" style={{marginLeft:30}}>
                          <div style={{fontFamily:'kanit-medium',fontSize:20,marginTop:15,marginLeft:0,color:COLOR.black}}>{auth.user.user_name}</div>
                       </Grid>
                        
                      </Grid>
                     
                    </Grid>
                  </Grid>
                </Box>
             
              </Toolbar>
          </AppBar>

           <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            
            <DrawerHeader 
            style={{borderWidth:2,borderStyle:'solid',borderColor:'black',borderRightWidth:0,minHeight:68}}>
              <Box style={{width:"80%"}}>
              <div  style={{fontFamily:'kanit-medium',fontSize:20,width:"100%",color:COLOR.black}}>Staff</div>
              <div className="color-green" style={{fontFamily:'kanit-medium',fontSize:14,marginTop:-5}}>management</div>
              </Box>
             
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List style={{paddingTop:0,width:drawerWidth}}>
                {/* <ListItem style={{minHeight:drawerHeight,backgroundColor:COLOR.green_tea,padding:0,borderWidth:1,borderColor:'white',borderStyle:'solid'}} button key={'main'} onClick = {()=>  history.push('/profile')}>
            
                     <Grid container  style={{padding:0}}>
                         <Grid item={true} xs= {1} style={currentPage == 1 ? select_tap:normal_tap}>

                         </Grid>
                          <Grid item={true} xs={7}>
                            <Box style={{padding:20,paddingTop:15}}>
                              <div style={{fontFamily:'kanit-medium',fontSize:20}}>Request</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:15}}>คำขอลูกค้า</div>
                            </Box>
                          </Grid>
                          <Grid xs = {4}>
                          <img
                              src={request_icon}
                              width='80'
                              height='80'
                              loading="lazy"
                              style={{marginTop:12}}
                            />
                          </Grid>
                     </Grid>
                </ListItem> */}
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.mint,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'admin_inbox'} onClick = {()=>  history.push('/admin_create_inbox')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                        
                       {currentPage == 1?select_side: none_select_first} 

                         <Grid style={{width:"55%",paddingTop:5,paddingLeft:10}}>
                            <Box>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Inbox Message</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ข้อความ</div>
                            </Box>
                          </Grid>
                          <Grid style={{paddingTop:23}}>
                          <img
                              src={inbox_admin_icon}
                              width='80'
                              height='80'
                              loading="lazy"
                            />
                          </Grid>
                       
                         
                     </Grid>
                </ListItem>
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'admin_customer'} onClick = {()=>  history.push('/admin_customer')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                       {currentPage == 2?select_side: none_select} 
                        
                       <Grid style={{paddingTop:23,paddingLeft:10}}>
                          <img
                              src={cust_icon}
                              width='80'
                              height='80'
                              loading="lazy"
                            />
                          </Grid>
                         <Grid style={{width:"55%",paddingTop:5,paddingLeft:10}}>
                            <Box >
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Customer INFO.</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ข้อมูลลูกค้า</div>
                            </Box>
                          </Grid>
                         
                     </Grid>
                </ListItem>

                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.mint,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'zones'} onClick = {()=>  history.push('/admin_import_stocks')}>
                      <Grid container  style={{height:drawerHeight,padding:0}}>
                         {currentPage == 5?select_side: none_select} 
                          
                         <Grid style={{paddingTop:23,paddingLeft:10}}>
                            <img
                                src={recieve_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                            </Grid>
                            <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>In Bounds</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>สินค้าเข้าคลัง</div>
                              </Box>
                            </Grid>
                         
                     </Grid>
                </ListItem>

                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'admin_current_stocks'} onClick = {()=>  history.push('/admin_current_stocks')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                         {currentPage == 4?select_side: none_select} 
                            <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Inventory</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>สินค้า</div>
                              </Box>
                            </Grid>
                         <Grid style={{paddingTop:23}}>
                            <img
                                src={inventory_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                            </Grid>
                           
                         
                     </Grid>
                </ListItem> 
                
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.mint,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'admin_warehouse_manager'} onClick = {()=>  history.push('/admin_warehouse_manager')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                         
                         {currentPage == 3?select_side: none_select} 
                         <Grid style={{paddingTop:23,paddingLeft:10}}>
                            <img
                                src={warehouse_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                            </Grid>
                            <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Warehouse</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ระบบคลังสินค้า</div>
                              </Box>
                            </Grid>
                         
                     </Grid>
                </ListItem> 
               
                 
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.mint,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'stocks_out_status'} onClick = {()=>  history.push('/admin_export_stocks')}>
                     <Grid container  style={{height:drawerHeight,padding:0}}>
                          
                         {currentPage == 6?select_side: none_select} 
                        
                         <Grid style={{width:"56%",paddingTop:10,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Out Bounds</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>สินค้าออกจากคลัง</div>
                              </Box>
                          </Grid>
                         <Grid style={{paddingTop:23}}>
                            <img
                                src={issue_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:0}}
                              />
                            </Grid>      
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}}  button key={'stocks_in_out_list'} onClick = {()=>  history.push('/admin_report')}>
                      <Grid container  style={{height:drawerHeight,padding:0}}>
                        
                       {currentPage == 7?select_side: none_select} 

                       <Grid style={{paddingTop:23,paddingLeft:10}}>
                            <img
                                src={report_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                          </Grid>
                            <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                            <Box>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Report</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>รายงาน</div>
                            </Box>
                          </Grid>
                          
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.mint,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'report_admin'} onClick = {()=>  history.push('/admin_manage_staff')}>
                    <Grid container  style={{height:drawerHeight,padding:0}}>
                         
                    {currentPage == 8?select_side: none_select} 
                        
                       <Grid style={{paddingTop:23,paddingLeft:10}}> 
                            <img
                                src={admin_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                            </Grid>
                            <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>ADMIN</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>บัญชีผู้ใช้</div>
                              </Box>
                            </Grid>
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:1,borderColor:'white',borderStyle:'solid'}} button key={'logout'} onClick = {async ()=> await logout()}>
                    <Grid container  style={{height:drawerHeight,padding:0}}>
                      <Grid style={{width:30}}></Grid>
                      <Grid style={{width:"55%",paddingTop:25,paddingLeft:10}}>
                              <Box>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Logout</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ออกจากระบบ</div>
                              </Box>
                            </Grid>
                       <Grid style={{paddingTop:23,paddingLeft:0}}> 
                            <img
                                src={logout_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                              />
                            </Grid>
                            
                     </Grid>
                </ListItem>
              
            </List>
            <Divider />
          </Drawer>
          </>
          //
          // CUSTOMER VIEW
          //
           : <>
            <AppBar position="fixed" style={{backgroundColor:COLOR.red,borderWidth:2,borderStyle:'solid',borderColor:'black' }} open={open}>
              <Toolbar style={{paddingRight:0,overflow:'hidden'}}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={3} >
                    <Grid item sm={2} >
                      <Box style={{marginTop:10}}>
                      <img
                        src={logo}
                        width='40'
                        height='40'
                        loading="lazy"
                      />
                      </Box>
                 
                    </Grid>
                    <Grid item sm={6}>
                    </Grid>
                    <Grid item sm={1} style={{paddingLeft:0}} >
                      
                      <Box style={{marginTop:13,textAlign:'right',paddingRight:30}} onClick={handleClickListItem}>
                      
                      {alert.count == 0 ?    
                            <img
                            onClick={handleMenuItemClick}
                              src={ring}
                              width='40'
                              height='40'
                              loading="lazy"
                            />:
                            <Box style={{position:'relative'}} onClick={handleMenuItemClick} >
                            <img
                              src={ring}
                              width='40'
                              height='40'
                              loading="lazy"
                            />
                            <Box style={{position:"absolute",top:'-8px',right:'-10px',border:'1.5px solid black',borderRadius:20,width:24,height:24,fontSize:14,
                              fontFamily:'kanit-medium',backgroundColor:'#c8553e',textAlign:'center'}}>{alert.count}</Box>
                          </Box>
                        }
                      </Box>
                      <Menu
                              id="lock-menu"
                              anchorEl={anchorEl}
                              open={open_alert}
                              onClose={handleClose}
                              MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                              }}
                            >
                                <List sx={{ width: '100%', width: 360, bgcolor: 'background.paper' }}>
                                {alert && alert.list.map((option, index) => (
                                  <>
                                    <ListItem alignItems="flex-start"  style={{alignItems:'center'}}  key={option._id}  onClick={(event) => {
                                        if(option.type == 1 || option.type == 2){
                                          history.replace({pathname:'/detail_inbox',state:{inbox_id:option.inbox}})
                                        }
                                        else {
                                          history.replace('/invoice/'+option.invoice)
                                        }
                                        setAnchorEl(null);
                                      }}>
                                      <ListItemAvatar>
                                        {option.by_user && <Avatar alt="Avatar" src={ option.by_user.avatar} />}
                                      </ListItemAvatar>
                                      <ListItemText
                                        primaryTypographyProps={{fontFamily:'kanit-regular',fontSize:18}}
                                        primary={option.subject}
                                        secondary={
                                          <React.Fragment >
                                            <Typography
                                              sx={{ display: 'inline' }}
                                              component="span"
                                              variant="body2"
                                              color="text.primary"
                                              style={{fontFamily:'kanit-regular',fontSize:16}}
                                            >
                                              {option.by_user && option.by_user.name} {','}
                                            </Typography>
                                            {option.detail.length > 60 ? option.detail.slice(0,60): option.detail}
                                          </React.Fragment>
                                        }
                                      />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    </>
                                    ))}
                                     <ListItem key='view_alert' style={{justifyContent:'right'}} onClick={(event) => {
                                       
                                        history.replace('/alert_list/')
                                        
                                        setAnchorEl(null);
                                      }}>
                                          <button
                                              style={{textAlign:'right',backgroundColor:COLOR.white,borderWidth:0,color:COLOR.peach, display: 'inline',fontFamily:"kanit-regular" }}
                                    
                                              
                                            >
                                             view all
                                            </button>
                                     </ListItem>
                                </List>

                             
                          </Menu>
                    </Grid>
                    
                    <Grid item sm={3} style={{backgroundColor:COLOR.orange,height:88,borderLeft:'2px solid black'}} onClick={()=>history.replace({pathname:'/profile'})}>
                      <Grid container>
                        <Grid justify = "center" style={{width:40}}>
                            {auth.user &&
                            auth.user.avatar ?   
                              <img
                                src={ auth.user.avatar}
                                width='40'
                                height='40'
                                loading="lazy"
                                style={{marginTop:12,objectFit:"cover",borderRadius:20}}
                              />:
                              <img
                              src={camera_icon}
                              width='40'
                              height='40'
                              loading="lazy"
                              style={{marginTop:12}}
                            />
                          }
                        </Grid>
                       <Grid justify = "center" style={{position:'relative',marginLeft:30}} >
                          <div style={{fontFamily:'kanit-medium',fontSize:20,
                          position: 'absolute', 
                          color:COLOR.black,
                          left: '5%', 
                          top: '52%',
                          transform: 'translate(0%, -50%)'}}>{auth.user && auth.user.user_name}</div>
                       </Grid>
                        
                      </Grid>
                     
                    </Grid>
                  </Grid>
                </Box>
             
              </Toolbar>
          </AppBar>

           <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            
            <DrawerHeader style={{borderWidth:2,borderStyle:'solid',borderColor:'black',borderRightWidth:0,minHeight:68}}>
              <Box>
              <div className="color-red" style={{fontFamily:'kanit-medium',fontSize:20}}>Tongsuen.Logistics</div>
              <div className="color-green" style={{fontFamily:'kanit-medium',fontSize:14,marginTop:-5}}>WMS</div>
              </Box>
             
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List style={{paddingTop:0,width:drawerWidth}}>
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'main'} onClick = {()=>  history.push('/profile')}>
            
                     <Grid container  style={{padding:0,heigth:drawerHeight}}>
                         {currentPage == 1?select_side_normal: none_select_first}
                          <Grid>
                            <Box style={{padding:20,paddingTop:25}}>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Data</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ข้อมูลส่วนตัว</div>
                            </Box>
                          </Grid>
                          <Grid >
                          <img
                              src={profile}
                              width='80'
                              height='80'
                              loading="lazy"
                              style={{marginTop:22}}
                            />
                          </Grid>
                     </Grid>
                </ListItem>
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'stocks'} onClick = {()=>  history.push('/list_inbox')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                      {currentPage == 2?select_side_normal: none_select}
                         <Grid style={{padding:20,paddingTop:0,width:80,paddingLeft:10}}>
                          <img
                              src={message}
                              width='80'
                              height='80'
                              loading="lazy"
                              style={{marginTop:22}}
                            />
                          </Grid>
                          <Grid style={{width:150,padding:10}}>
                            <Box style={{padding:20,paddingTop:15}}>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Message</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ข้อความ</div>
                            </Box>
                          </Grid>
                         
                     </Grid>
                </ListItem>
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'current_stocks'} onClick = {()=>  history.push('/current_stocks')}>
                  <Grid container  style={{height:drawerHeight,padding:0}}>
                        {currentPage == 3?select_side_normal: none_select}
                          <Grid style={{padding:20,paddingTop:10,width:80,paddingLeft:10}}>
                            <img
                                src={warehouse}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:12}}
                              />
                            </Grid>
                            <Grid >
                              <Box style={{padding:10,paddingLeft:20,paddingTop:25}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Warehouse</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>คลังสินค้า</div>
                              </Box>
                            </Grid>
                         
                     </Grid>
                </ListItem> 
                 <ListItem style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'zones'} onClick = {()=>  history.push('/action_stocks')}>
                      <Grid container  style={{height:drawerHeight,padding:0}}>
                          {currentPage == 4?select_side_normal: none_select}
                          <Grid style={{padding:20,paddingTop:10,width:80,paddingLeft:10}}>
                            <img
                                src={stockout}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:12}}
                              />
                            </Grid>
                            <Grid >
                              <Box style={{padding:0,marginTop:5,marginLeft:15}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Out Bounds</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>เลือกสินค้า <br/>ออกจากคลัง</div>
                              </Box>
                            </Grid>
                         
                     </Grid>
                </ListItem>
                <ListItem style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'stocks_out_status'} onClick = {()=>  history.push('/stocks_out_status')}>
                     <Grid container  style={{height:drawerHeight,padding:0}}>
                     {currentPage == 5?select_side_normal: none_select}
                          <Grid style={{width:130}} >
                              <Box style={{padding:0,marginTop:5,marginLeft:15}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Status Check</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20,width:140}}>สถานะสินค้าออก</div>
                              </Box>
                          </Grid>
                          <Grid style={{paddingLeft:15,paddingTop:15}}>
                            <img
                                src={status}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:0}}
                              />
                            </Grid>      
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}}  button key={'stocks_in_out_list'} onClick = {()=>  history.push('/stocks_in_out_list')}>
                      <Grid container  style={{height:drawerHeight,padding:0,marginTop:-1}}>
                      {currentPage == 6?select_side_normal: none_select}
                          <Grid style={{width:140}}>
                            <Box style={{padding:20,paddingTop:10}}>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>History</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ประวัติเข้า-ออก</div>
                            </Box>
                          </Grid>
                          <Grid>
                          <img
                              src={time}
                              width='80'
                              height='80'
                              loading="lazy"
                              style={{marginTop:22}}
                            />
                          </Grid>
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'report_customer'} onClick = {()=>  history.push('/customer_report')}>
                    <Grid container  style={{height:drawerHeight,padding:0}}>
                    {currentPage == 7?select_side_normal: none_select}
                          <Grid style={{padding:20,paddingTop:10,width:80,paddingLeft:10}}>
                            <img
                                src={report}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:12}}
                              />
                            </Grid>
                            <Grid>
                              <Box style={{padding:20,paddingTop:25}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Report</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>รายงาน</div>
                              </Box>
                            </Grid>
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'chart'} onClick = {()=>  history.push('/chart')}>
                    <Grid container  style={{height:drawerHeight,padding:0}}>
                    {currentPage == 8?select_side_normal: none_select}
                          <Grid style={{padding:20,paddingTop:10,width:80,paddingLeft:10}}>
                            <img
                                src={graph_icon}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:12}}
                              />
                            </Grid>
                            <Grid >
                              <Box style={{padding:20,paddingTop:25}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Chart</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>กราฟ</div>
                              </Box>
                            </Grid>
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.soft,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}}  button key={'note_list'} onClick = {()=>  history.push('/note_list')}>
                      <Grid container  style={{height:drawerHeight,padding:0,marginTop:-1}}>
                      {currentPage == 9 ?select_side_normal: none_select}
                          <Grid style={{width:140}}>
                            <Box style={{padding:20,paddingTop:25}}>
                              <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Notes</div>
                              <div  style={{fontFamily:'kanit-regular',fontSize:20}}>หมายเหตุ</div>
                            </Box>
                          </Grid>
                          <Grid>
                          <img
                              src={notes_icon}
                              width='80'
                              height='80'
                              loading="lazy"
                              style={{marginTop:22}}
                            />
                          </Grid>
                     </Grid>
                </ListItem>
                <ListItem  style={{height:drawerHeight,backgroundColor:COLOR.white,padding:0,borderWidth:2,borderColor:'black',borderStyle:'solid',borderTopWidth:0,borderLeftWidth:0}} button key={'logout'} onClick = {async ()=> await logout()}>
                    <Grid container  style={{height:drawerHeight,padding:0}}>
                          <Grid style={{width:30}}></Grid>
                          <Grid>
                              <Box style={{padding:20,paddingTop:25,paddingLeft:10}}>
                                <div style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:25}}>Logout</div>
                                <div  style={{fontFamily:'kanit-regular',fontSize:20}}>ออกจากระบบ</div>
                              </Box>
                            </Grid>
                           <Grid style={{padding:20,paddingTop:10,width:80,paddingLeft:0}}>
                            <img
                                src={logout_icon2}
                                width='80'
                                height='80'
                                loading="lazy"
                                style={{marginTop:12}}
                              />
                            </Grid>
                        
                     </Grid>
                </ListItem>
            </List>
            <Divider />
          </Drawer>
          </>
        }
          <Main open={open}>
            <DrawerHeader />
          
               {children}
           
          </Main>
        </Box>
        
      );
  }
 else{
     return <>{children}</>
 }
}

Landing.propTypes = {
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state => ({
    auth:state.auth,
    alert:state.utils.alert,
    isAuthenticated:state.auth.isAuthenticated,
})
export default connect(mapStateToProps,{loadUser,logout,list_alert_customer,list_alert_staff,set_read_alert})(Landing)