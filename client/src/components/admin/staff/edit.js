import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import * as COLOR from '../../../utils/color';
import moment from 'moment'
import logo from '../../../resource/images/data/dt01@1x.png';
import edit from '../../../resource/images/data/dt08@1x.png';

import home from '../../../resource/images/data/dt02@2x.png';
import letter from '../../../resource/images/data/dt03@2x.png';
import world from '../../../resource/images/data/dt04@2x.png';
import tel from '../../../resource/images/data/dt05@2x.png';
import phone from '../../../resource/images/data/dt06@2x.png';
import save from '../../../resource/images/staff/head/29.png';

const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [user,setUser] = useState( {email:'test@gmail.com'})

    useEffect(async () => {
        
        
      },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20, minWidth:800 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>เเก้ไขบัญชี</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
             </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,paddingTop:10}}>
                
                <Box style={{padding:10,backgroundColor:COLOR.white,margin:20,paddingBottom:40}} >
                    <Grid
                    container
                    style={{height:'100%'}}        
                    >
                       <Grid item={true} xs={5} 
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                            <img
                              src={logo}
                              width='120'
                              height='120'
                              loading="lazy"
                              style={{display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop:30,
                                objectFit:'contain'
                                }}
                        />
                        </Grid>
                        <Grid item={true} xs={7} 
                        container
                        style={{paddingTop:20}}>
                            <Grid xs ={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อบัญชีผู้ใช้</Typography>
                                <TextField placeholder='user name' size='small'style={{paddingBottom:5}}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>อีเมลล์</Typography>
                                <TextField placeholder='email' size='small' style={{paddingBottom:5}}></TextField>
                            </Grid>
                            <Grid xs ={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสผ่าน</Typography>
                                <TextField placeholder='password' size='small' style={{paddingBottom:5}}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ยืนยันรหัสผ่าน</Typography>
                                <TextField placeholder='confirm password' size='small' style={{paddingBottom:5}}></TextField>
                            </Grid>
                        </Grid>
                       
                    </Grid> 
                       
                </Box>
                <Grid container >
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อนามสกุล</Typography>
                            <TextField placeholder='name' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ตำเเหน่ง</Typography>
                            <TextField placeholder='' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทรศัพท์</Typography>
                            <TextField placeholder='tel' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>สิทธิ์การเข้าใช้งาน</Typography>
                            <TextField placeholder='permission' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }}></TextField>

                            <Button variant="outlined" startIcon={<img
                                src={save}
                                width='20'
                                height='20'
                                loading="lazy"
                                style={{marginTop:0}}
                                />}
                                style={{backgroundColor:COLOR.white,color:COLOR.black,borderRadius:0,marginTop:20,border:'1px solid black',borderColor:COLOR.black,fontFamily:'kanit-regular',fontSize:16 }}>
                                    SAVE
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ที่อยู่</Typography>
                            <TextField placeholder='address' size='small' style={{paddingBottom:5,width:"100%"}} multiline rows={4}></TextField>
                            
                        
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
