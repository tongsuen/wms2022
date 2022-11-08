import React,  {Fragment,useState}  from 'react'

import {Link, Redirect} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login,forget_password} from '../../actions/auth'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as COLOR from '../../utils/color';

import StandardInput from '../custom/login_textfield';
import Paper from '@mui/material/Paper';
import bg from '../../resource/images/login/st01.jpg';
import bg_2 from '../../resource/images/login/st02.png';
import customer_logo from '../../resource/images/login/st03.png';
import user_icon from '../../resource/images/login/st04.png';
import password_icon from '../../resource/images/login/st05.png';
import { Alert,Row,Col,Form } from 'react-bootstrap';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login({login,forget_password,isAuthenticated}) {
  const [open, setOpen] = React.useState(false);
  const [emailReset, setEmailReset] = React.useState(false);
  const [errors,setErrors] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData,setFormData] = useState({
      email:'admin@gmail.com',
      password:'123456789',
  });
  const [errorMsg,setErrorMsg] = useState('');
  const {email,password} = formData;
  const [loading,setLoading] = useState(false);
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const [checked, setChecked] = React.useState(false);

  const onSubmit = async e => {
      e.preventDefault();
      setLoading(true)
      const res = await login({email,password}); 
      console.log(res);
      
      if(!res.success){
          setErrors(res.msg.errors)
          setLoading(false);
      }    
  }
  //redirect if login
  if(isAuthenticated){
      return <Redirect to='/admin_requests' />
  }
  return (
    <ThemeProvider theme={theme}>
        <Box style={{
            backgroundImage: `url(${bg})`,
            height:"100vh",
            minWidth:1280,
            position:'relative',
            justifyContent:'center',

            backgroundPosition:'center',backgroundSize:'contain'
            }}>
                <Box elevation={3} style={{width:1100,height:680,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
            backgroundImage: `url(${bg_2})`}}>
                    <Box component="form" onSubmit={onSubmit} style={{width:490,height:680,marginLeft:610}}>
                        <img src={customer_logo} style={{marginLeft:100,marginTop:140}} />

                        <Box style={{border:'1px solid black',width:400,height:190,marginLeft:40,marginTop:20}}>
                            <Box style={{width:400,height:40,backgroundColor:COLOR.brown,borderBottom:'1px solid black'}}>
                               
                            </Box>
                            <Grid container>
                                    <Grid xs ={2} style={{padding:20}}>
                                    <img src={user_icon} />
                                    </Grid>
                                    <Grid item={true} xs={10} style={{padding:20}}>
                                        <StandardInput value={formData.email}  onChange = {onChange} name='email' placeholder='email' size='small' style={{width:"100%"}}></StandardInput>
                           
                                    </Grid>
                            </Grid>

                            <Grid container style={{marginTop:-20}}>
                                    <Grid xs ={2} style={{padding:20}}>
                                    <img src={password_icon} />
                                    </Grid>
                                    <Grid item={true} xs={10} style={{padding:20}}>
                                        <StandardInput type='password' onChange = {onChange} value={password} name='password' placeholder='password' size='small' style={{width:"100%"}}></StandardInput>
                           
                                    </Grid>
                            </Grid>
                        </Box>

                        <Typography style={{fontFamily:'kanit-regular',fontSize:14,textAlign:'right',fontStyle:'italic',marginRight:49}} onClick={handleClickOpen}>Forgot Your Password?</Typography>

                        <Button 
                            type="submit"style={{backgroundColor:COLOR.brown,fontFamily:'kanit-medium',fontSize:20,borderRadius:20,width:300,color:COLOR.white,marginTop:20,height:40,marginLeft:90}}>Log in</Button>
                        {errors.map(e => {
                          return <Typography key={e.msg} onClick={handleClickOpen} style={{fontFamily:'kanit-regular',fontSize:14,color:COLOR.red,textAlign:'left',fontStyle:'italic',marginLeft:20,marginTop:20}}>{e.msg}</Typography>
                        })}
                    </Box>

                  
                </Box>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To reset your password, please enter your email address here. We will send LINK for update your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange= {(e)=>{
                setEmailReset(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={ async ()=>{
                const res = await forget_password({email:emailReset})
                alert('check your email')
                setOpen(false)
            }}>Confirm</Button>
          </DialogActions>
        </Dialog>
        
    </ThemeProvider>
  );
}
Login.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,

})
export default connect(mapStateToProps,{login,forget_password})(Login)