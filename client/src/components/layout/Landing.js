import React,  {Fragment,useState}  from 'react'

import {Link, useHistory,Redirect} from 'react-router-dom'
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
import {login} from '../../actions/auth'

import * as COLOR from '../../utils/color';
import Paper from '@mui/material/Paper';
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

function Login({login,setAlert,isAuthenticated}) {

  const history = useHistory()
  const [formData,setFormData] = useState({
      email:'admin@gmail.com',
      password:'123456',
  });
  const [errorMsg,setErrorMsg] = useState('');
  const {email,password} = formData;
  const [loading,setLoading] = useState(false);
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked)
    if(event.target.checked == true){
      setFormData({email:'admin_2@gmail.com',password:'ABCdef12345'})
    }else{
      setFormData({
          email:'admin@gmail.com',
          password:'123456',
      })
    }
  };
  const onSubmit = async e => {
      e.preventDefault();
      setLoading(true)
      const res = await login({email,password}); 
      console.log(res);
      
      if(!res.success){
          setErrorMsg(res.msg)
          setLoading(false);
      }    
  }
  //redirect if login
  if(isAuthenticated){
      return <Redirect to='/profile' />
  }
  return (
      <Box style={{height:'100vh',justifyContent:'center',backgroundColor:COLOR.soft_green}}>
        <Grid container align='center' style={{paddingTop:'15%'}}>
            <Grid item={true} xs={6}>
              <Paper elevation={3} style={{width:200,padding:10}}    onClick= {()=> history.push({pathname:'/c_login'})}>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>LOGIN</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>WITH</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>CUSTOMER</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>EMAIL</Typography>
              </Paper>
            </Grid>
            <Grid item={true} xs={6}>
              <Paper elevation={3} style={{width:200,padding:10}}  onClick= {()=> history.push({pathname:'/s_login'})}>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>LOGIN</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>WITH</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>STAFF</Typography>
                  <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>EMAIL</Typography>
              </Paper>
            </Grid>
        </Grid>
      </Box>
  );
}
Login.propTypes = {
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated,

})
export default connect(mapStateToProps,{login})(Login)