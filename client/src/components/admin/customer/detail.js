import React,  {Fragment,useState,useEffect}  from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {get_user} from '../../../actions/manager'
import Typography from '@mui/material/Typography';

import * as COLOR from '../../../utils/color';
import * as BASE from '../../../utils/const';
import moment from 'moment'
import logo from '../../../resource/images/data/dt01@1x.png';
import edit from '../../../resource/images/data/dt08@1x.png';

import home from '../../../resource/images/data/dt02@2x.png';
import letter from '../../../resource/images/data/dt03@2x.png';
import world from '../../../resource/images/data/dt04@2x.png';
import tel from '../../../resource/images/data/dt05@2x.png';
import phone from '../../../resource/images/data/dt06@2x.png';
import fax from '../../../resource/images/data/dt07@2x.png';

const Screen  = ({auth,get_user}) => {
    const [user,setUser] = useState( [])
    const history = useHistory()
    const {email} = useParams()
    useEffect(async () => {
        try {
            const res = await get_user({email:email});
            console.log(res);
            if(res.success){
                setUser( res.data)
    
            }
        }catch(err){
            console.log(err);
            
        }
      
    
        
      },[]);
     
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อมูลส่วนตัว</Typography>
            <Grid container style={user && user.admin ?{padding:10,backgroundColor:COLOR.peach,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}:{padding:10,backgroundColor:COLOR.soft,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}}>
                    <Grid xs = {6} style={{marginTop:10}}>

                        <Typography style={{fontFamily:'kanit-regular',fontSize:20,color:COLOR.black,marginLeft:10}}>รายละเอียดข้อมูล</Typography>
                    </Grid>
                    <Grid xs = {6} alignContent='right' align='right'>
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:100,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                        startIcon={ <img
                              src={edit}
                              width='30'
                              height='30'
                              loading="lazy"
                              
                        />}
                        onClick= {()=> history.push({pathname:'/profile_edit',state:{email:user.email}})}>
                        EDIT
                    </Button>
                    </Grid>
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid',borderColor:'black',borderTopWidth:1}}>
                
                <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                    <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <img
                              src={(user) ? user.avatar:logo}
                              width='120'
                              height='120'
                              loading="lazy"
                              style={{margin:10,borderRadius:"50%",objectFit:'cover'}}
                        />
                        {user &&       <>                  
                         <Typography style={{fontFamily:'kanit-medium',fontSize:22,color:COLOR.black}}> -{user.name} {user.last_name}</Typography>
      
                        <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}> user: {user.user_name}</Typography>
                        <Typography style={{fontFamily:'kanit-medium',fontSize:20,color:COLOR.red,marginTop:10,marginBottom:10}}> ตำเเหน่ง {user.position}</Typography> </>}

                    </Grid> 
                       
                </Box>
                <Grid container >
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="left"
                            >   
                                <Grid item={true} xs={12}>
                                    <Grid container>
                                    <Grid item={true} xs={3} style={{maxWidth:80}}>
                                        <img
                                            src={home}
                                            width='40'
                                            height='40'
                                            loading="lazy"
                                            style={{margin:10}}
                                        />
                                        </Grid>
                                        <Grid item={true} xs={9} style={{margin:'auto',marginLeft:0}}>
                        <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{user && user.address} { user && user.province} { user && user.passcode}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                               

                                <Grid item={true} xs={12}>
                                    <Grid container>
                                    <Grid item={true} xs={3} style={{maxWidth:80}}>
                                        <img
                                            src={letter}
                                            width='40'
                                            height='40'
                                            loading="lazy"
                                            style={{margin:10}}
                                        />
                                        </Grid>
                                        <Grid item={true} xs={9} style={{margin:'auto',marginLeft:0}}>
                                            <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{user && user.email}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                               
                                <Grid item={true} xs={12}>

                                    <Grid container>
                                    <Grid item={true} xs={3} style={{maxWidth:80}}>
                                        <img
                                            src={world}
                                            width='40'
                                            height='40'
                                            loading="lazy"
                                            style={{margin:10}}
                                        />  
                                        </Grid>
                                        <Grid item={true} xs={9} style={{margin:'auto',marginLeft:0}}>
                                            <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{user && user.website}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                               
                            </Grid> 
                            
                        </Box>
                    </Grid>
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            <Grid
                            container
                            spacing={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="left"
                            >
                                <Grid style={{width:80}}>
                                <img
                                    src={tel}
                                    width='40'
                                    height='40'
                                    loading="lazy"
                                    style={{margin:10}}
                                />
                                </Grid>
                                <Grid>
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{user&&user.tel} </Typography>
                                </Grid>

                                <Grid item={true} xs={12}></Grid>
                                <Grid  style={{width:80}}>
                                <img
                                    src={phone}
                                    width='40'
                                    height='40'
                                    loading="lazy"
                                    style={{margin:10}}
                                />
                                </Grid>
                                <Grid>
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{user&&user.tel_2} </Typography>
                                </Grid>
                                <Grid item={true} xs={12}></Grid>
                                <Grid  style={{width:80}}>
                                <img
                                    src={fax}
                                    width='40'
                                    height='40'
                                    loading="lazy"
                                    style={{margin:10}}
                                />
                                </Grid>
                                <Grid>
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{user&&user.fax} </Typography>
                                </Grid>
                            </Grid> 
                            
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_user})(Screen)
