import React,  {Fragment,useState}  from 'react'

import {useParams, useHistory} from 'react-router-dom'
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
import {reset_password} from '../../actions/auth'

import * as COLOR from '../../utils/color';

import StandardInput from '../custom/login_textfield';
import Paper from '@mui/material/Paper';
import bg from '../../resource/images/login/st01.jpg';
import bg_2 from '../../resource/images/login/st02.png';
import customer_logo from '../../resource/images/login/st03.png';
import user_icon from '../../resource/images/login/st04.png';
import password_icon from '../../resource/images/login/st05.png';
import { Alert,Row,Col,Form } from 'react-bootstrap';

const theme = createTheme();

function Screen({reset_password,setAlert,isAuthenticated}) {

  const [formData,setFormData] = useState({});
  const [errorMsg,setErrorMsg] = useState('');
  const {password,confirm_password} = formData;
  const [loading,setLoading] = useState(false);
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const [checked, setChecked] = React.useState(false);

  const {token} = useParams()
  const history = useHistory()
  const onSubmit = async e => {
      e.preventDefault();
      setLoading(true)
      const res = await reset_password({password,confirm_password,token}); 
      console.log(res);
      
      if(res.success){
          alert('Complete')
          history.replace('/');
      } else{
          alert('Fail')
      }  
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
                        <Typography style={{fontFamily:'kanit-medium',fontSize:30,color:COLOR.peach,marginTop:160,textAlign:'center',width:"100%"}} >
                            New Password
                        </Typography>
                        <Box style={{border:'1px solid black',width:400,height:190,marginLeft:40,marginTop:20}}>
                            <Box style={{width:400,height:40,backgroundColor:COLOR.brown,borderBottom:'1px solid black'}}>
                               
                            </Box>
                            <Grid container>
                                    <Grid xs ={2} style={{padding:20}}>
                                    <img src={password_icon} />
                                    </Grid>
                                    <Grid item={true} xs={10} style={{padding:20}}>
                                    <StandardInput type='password' onChange = {onChange} name='password' placeholder='password' size='small' style={{width:"100%"}}></StandardInput>
                           
                                    </Grid>
                            </Grid>

                            <Grid container style={{marginTop:-20}}>
                                    <Grid xs ={2} style={{padding:20}}>
                                    <img src={password_icon} />
                                    </Grid>
                                    <Grid item={true} xs={10} style={{padding:20}}>
                                        <StandardInput type='password' onChange = {onChange} name='confirm_password' placeholder='confirm password' size='small' style={{width:"100%"}}></StandardInput>
                           
                                    </Grid>
                            </Grid>
                        </Box> 
                        <Button 
                            type="submit"style={{backgroundColor:COLOR.brown,fontFamily:'kanit-medium',fontSize:20,borderRadius:20,width:300,color:COLOR.white,marginTop:20,height:40,marginLeft:90}}>Save</Button>
                   
                    </Box>

                  
                </Box>
        </Box>
    </ThemeProvider>
  );
}
Screen.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,

})
export default connect(mapStateToProps,{reset_password})(Screen)