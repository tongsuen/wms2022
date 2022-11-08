import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {get_admins} from '../../../actions/manager'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as COLOR from '../../../utils/color';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import plus from '../../../resource/images/staff/head/21.png';
  
const Screen  = ({auth,get_admins}) => {
    const [users,setUsers] = useState( [])
    const history = useHistory();
    useEffect(async () => {
            const res = await get_admins()
            console.log(res);
            if(res.success){
                setUsers(res.data)
            }
      },[]);

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ADMIN</Typography>

            <Grid container style={{padding:10,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
             </Grid>
            <Box style={{backgroundColor:COLOR.gray,borderWidth:2,borderStyle:'solid',minHeight:500,minWidth:800}}>
               
                
                <Grid container style={{padding:20}}>
                    <Grid item={true} xs={12}style={{paddingBottom:10,paddingTop:10,backgroundColor:COLOR.white}} >
                        <Button
                            onClick = {()=>{ history.push('/admin_create')}}
                        style={{marginLeft:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',fontSize:22,backgroundColor:COLOR.soft,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={plus}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}>
                            เพิ่มข้อมูล
                        </Button>
                    </Grid>
                    <Grid container style={{backgroundColor:COLOR.white,paddingBottom:20}} align="center">
                       
                        {/* <Grid xs = {3} style={{padding:20}}>
                            <ThemeProvider theme={lightTheme}>
                                <Box
                            
                                >
                                    <Item key={4} elevation={4} style={{padding:20}}>
                                    <Typography style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5}}>01</Typography>
                                    <Typography style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5,paddingBottom:10}}>Song Joong Ki</Typography>
                                    <Box style={{paddingTop:10,backgroundColor:COLOR.soft_green,width:100,height:100,borderRadius:50,border:'solid 1px black',alignItems:'center',justifyContent:'center',margin:'auto'}}>
                                    </Box>
                                    <Button style={{marginTop:10,borderRadius:0,color:COLOR.black,fontFamily:'kanit-regular',width:110,fontSize:15,backgroundColor:COLOR.soft,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}}  
                                        onClick = {()=>  history.push('/admin_list_inbox')}>
                                        see more
                                    </Button>
                                    </Item>
                        
                                </Box>
                            </ThemeProvider>
                        </Grid> */}

                       


                        
                        {users.map((user,index)=>{
                            return <Grid key={user._id} xs = {3} style={{marginTop:20,maxWidth:240}}>
                                            <Box style={{borderRight:'1px solid black',borderBottom:'1px solid black',padding:20}}
                                            >
                                               <Typography style={{fontFamily:'rockwell',fontSize:35,fontWeight:'bold',fontStyle:'italic',textAlign:'left',padding:5,color:COLOR.dark_green}}>{('0' + (index+1)).slice(-2)}</Typography>
                                             <Typography style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5,paddingBottom:10}}>{user.name}</Typography>
                                                {user.avatar ?
                                                <img style={{width:100,height:100,borderRadius:50,alignItems:'center',justifyContent:'center',margin:'auto',objectFit:'cover'}} src={user.avatar} /> 
                                                
                                                :<img style={{backgroundColor:COLOR.soft_green,width:100,height:100,borderRadius:50,border:'solid 1px black',alignItems:'center',justifyContent:'center',margin:'auto'}}>
                                                
                                                </img>
                                             }
                                                <Box style={{width:"100%",alignItems:'center',justifyContent:'center',margin:'auto',textAlign:'center'}}>
                                                    <Button 
                                                    style={{height:24,marginTop:10,borderRadius:0,color:COLOR.white,fontFamily:'kanit-regular',fontSize:15,backgroundColor:'#f29d79',padding:10,boxShadow:'5px 5px 0px #a74d40'}}  
                                                        onClick = {()=>  history.push({pathname:'/admin_profile/'+user.email})}>
                                                        see more
                                                    </Button>
                                                </Box>
                                            
                                    
                                            </Box>
                                    </Grid>
                        })}
                     
                    </Grid>
                </Grid>
                           
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_admins})(Screen)
