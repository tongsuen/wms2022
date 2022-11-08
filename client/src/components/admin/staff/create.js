import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,export_stock,get_inventory,get_stocks,set_show_modal} from '../../../actions/manager'
import {register_admin} from '../../../actions/auth'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


import FileUploader from '../../../components/custom/file_upload'
import * as COLOR from '../../../utils/color';
import moment from 'moment'

import logo from '../../../resource/images/staff/customer/regis01.png';
import save from '../../../resource/images/staff/head/29.png';

const Screen  = ({set_show_modal,register_admin}) => {
   
    const [user,setUser] = useState({
        admin:true,
        role:1,
    })
    const [preview,setPreview] = useState(null)
    const history = useHistory()
    useEffect(async () => {
        
        
      },[]);
  
    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})

    }
    const onChangeFile = async (e) =>{

        setPreview(URL.createObjectURL(e.target.files[0]))
        setUser({...user,avatar:e.target.files[0]})

       
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>สร้างบัญชี</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
             </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,paddingTop:10,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
                
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
                               src={preview ? preview : logo}
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
                                <FileUploader onChange = {onChangeFile}>
                                    Upload a file
                                </FileUploader>
                        </Grid>
                        <Grid item={true} xs={7} 
                        container
                        style={{paddingTop:20}}>
                            <Grid xs ={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อบัญชีผู้ใช้</Typography>
                                <TextField name='user_name' placeholder='user name' size='small'style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>อีเมลล์</Typography>
                                <TextField name='email' placeholder='email' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสผ่าน</Typography>
                                <TextField name='password' type='password' placeholder='password' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ยืนยันรหัสผ่าน</Typography>
                                <TextField name='confirm_password' type='password' placeholder='confirm password' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                        </Grid>
                       
                    </Grid> 
                       
                </Box>
                <Grid container >
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อ/นามสกุล</Typography>
                            <TextField name='name' placeholder='name' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }} onChange = {onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ตำเเหน่ง</Typography>
                            <TextField name='position' placeholder='' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }} onChange = {onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทรศัพท์</Typography>
                            <TextField name='tel' placeholder='tel' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }} onChange = {onChange}></TextField>
                            <Typography  style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>สิทธิ์การเข้าใช้งาน</Typography>
                            <TextField name='role' placeholder='permission' size='small' style={{paddingBottom:5,width:"100%",fontFamily:'kanit-regular',fontSize:16 }} onChange = {onChange} disabled></TextField>

                            <Button variant="outlined" startIcon={<img
                                src={save}
                                width='20'
                                height='20'
                                loading="lazy"
                                style={{marginTop:0}}
                                />}
                                style={{backgroundColor:COLOR.white,color:COLOR.black,borderRadius:0,marginTop:20,border:'1px solid black',borderColor:COLOR.black,fontFamily:'kanit-regular',fontSize:16 }}
                                onClick = {async()=>{
                                    
                                    const res = await register_admin(user)
                                    if(res.success){
                                        set_show_modal(true,1,'Success','register complete!')
                                        history.replace('/admin_manage_staff/')
                                    }
                                    else{
                                       
                                        set_show_modal(true,2,'Fail',res.msg)
                                    }
                                }}>
                                    SAVE
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs = {6}>
                    <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >

                        <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ที่อยู่</Typography>
                        <TextField name='address' placeholder='name' size='small' style={{paddingBottom:5,width:"100%"}} multiline rows={3} onChange = {onChange}></TextField>
                        <Grid container>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>จังหวัด</Typography>
                                <TextField name='province' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสไปรษณีย์</Typography>
                                <TextField name='passcode' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทร</Typography>
                                <TextField name='tel_2' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>แฟกซ์</Typography>
                                <TextField name='fax' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} onChange = {onChange}></TextField>
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
export default connect(mapStateToProps,{register_admin,set_show_modal})(Screen)
