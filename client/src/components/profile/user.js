import React,  {useCallback,useState,useEffect}  from 'react'
import {Link,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import home from '../../resource/images/data/dt02@2x.png';
import letter from '../../resource/images/data/dt03@2x.png';
import world from '../../resource/images/data/dt04@2x.png';
import tel from '../../resource/images/data/dt05@2x.png';
import phone from '../../resource/images/data/dt06@2x.png';
import fax from '../../resource/images/data/dt07@2x.png';


const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [users,setUsers] = useState( [])
    const history = useHistory()
    // const escFunction = useCallback((event) => {
    //    // if (event.key === "Escape") {
    //       //Do whatever when esc is 
    //       console.log(event.key)
    //    // }
    //   }, [])
    useEffect(async () => {
        try {
            const res = await get_users();
            console.log(res);
            if(res.success){
                setUsers( res.data)
    
            }
        }catch(err){
            console.log(err);
            
        }
      
        // document.addEventListener("keydown", escFunction, false);
        // return () => {
        //     document.removeEventListener("keydown", escFunction, false);
        // };
      

        
      },[]);
     
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อมูลส่วนตัว</Typography>
            <Grid container style={auth.user && auth.user.admin ?{padding:10,backgroundColor:COLOR.peach,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}:{padding:10,backgroundColor:COLOR.soft,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}}>
                    <Grid xs = {6} style={{marginTop:10}}>

                        <Typography style={{fontFamily:'kanit-regular',fontSize:20,color:COLOR.black,marginLeft:10}}>รายละเอียดข้อมูล</Typography>
                    </Grid>
                    <Grid xs = {6} alignContent='right' align='right'>
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:100,fontSize:20,backgroundColor:COLOR.white,borderWidth:2,borderColor:COLOR.black,borderStyle:'solid'}} 
                        startIcon={ <img
                              src={edit}
                              width='30'
                              height='30'
                              loading="lazy"
                              
                        />}
                        onClick= {()=> history.push({pathname:'/profile_edit',state:{email:auth.user.email}})}>
                        EDIT
                    </Button>
                    </Grid>
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
                
                <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                    <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <img
                              src={(auth.user) ? (auth.user.avatar ? auth.user.avatar:logo):logo}
                              width='120'
                              height='120'
                              loading="lazy"
                              style={{margin:10,borderRadius:"50%",objectFit:'cover'}}
                        />
                        {auth.user &&       <>                  
                         <Typography style={{fontFamily:'kanit-medium',fontSize:22,color:COLOR.black}}> -{auth.user.name} {auth.user.last_name}</Typography>
      
                        <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}> user: {auth.user.user_name}</Typography>
                        <Typography style={{fontFamily:'kanit-medium',fontSize:20,color:COLOR.red,marginTop:10,marginBottom:10}}> ตำเเหน่ง {auth.user.position}</Typography> </>}

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
                        <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{auth.user && auth.user.address} {auth.user && auth.user.province} {auth.user && auth.user.passcode}</Typography>
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
                                            <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{auth.user && auth.user.email}</Typography>
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
                                            <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,margin:0}}>{auth.user && auth.user.website}</Typography>
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
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{auth.user&&auth.user.tel} </Typography>
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
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{auth.user&&auth.user.tel_2} </Typography>
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
                                
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black,marginTop:-10}}>{auth.user&&auth.user.fax} </Typography>
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
export default connect(mapStateToProps,{})(Screen)
