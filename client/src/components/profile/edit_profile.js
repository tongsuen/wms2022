import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useLocation} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_user,set_show_modal} from '../../actions/manager'

import {update_user,loadUser,save_avatar} from '../../actions/auth'
import FileUploader from '../../components/custom/file_upload'
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
import save from '../../resource/images/staff/head/29.png';

const Screen  = ({auth,update_user,loadUser,save_avatar,get_user,set_show_modal}) => {
    const [user,setUser] = useState({})
    const [preview,setPreview] = useState(null)
    const location = useLocation();

    useEffect(async () => {
        if(location.state.email){
            const res = await get_user({email:location.state.email})
            setUser(res.data)
            setPreview(res.data.avatar ? res.data.avatar:null)
        }
        else{
            console.log(auth.user);
            if(auth.user){
                setUser(auth.user)
                setPreview(auth.user.avatar ? auth.user.avatar:null)
            }
        }
       
        
      },[]);
  
    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(e.target.name);
    }
    const onChangeFile = async (e) =>{

       
        if(e.target.files[0]){
            const res = await save_avatar({avatar:e.target.files[0],user_id:user._id})
            if(res.success){
                console.log(res)
                setPreview(res.data.avatar)
                setUser({...user,avatar:e.target.files[0]})
              
                console.log(e.target.files[0])
                
                set_show_modal(true,1,'Upload','upload image to server success.')
                if(auth.user.email == user.email){
                    await loadUser()
                }
            }
            else{
                set_show_modal(true,2,'Upload','upload image to server fail.')
            }
        }
       
    }
    return (
     
        <div style={{ height: 400, width: '100%',marginBottom:20, minWidth:800 }}>
             {user ? <> 
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>เเก้ไขบัญชี</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
             </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,paddingTop:10,borderWidth:2,borderStyle:'solid'}}>
                
                <Box style={{padding:10,backgroundColor:COLOR.white,margin:20,paddingBottom:40}} >
                    <Grid
                    container
                    style={{height:'100%'}}        
                    >
                       <Grid item={true} xs={6} 
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                            <img
                              src={preview ? (preview) : logo}
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
                         {/* <Input
                                type="file"
                                name='file'
                                onChange = {onChangeFile}
                                style={{display:'none'}}
                            /> */}
                        </Grid>
                        <Grid item={true} xs={6} 
                        container
                        style={{padding:20,paddingLeft:40}}>
                            <Grid xs ={12}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อบัญชีผู้ใช้</Typography>
                                <TextField name='user_name' placeholder='user name' size='small'style={{paddingBottom:5}} value={user && user.user_name} onChange={onChange}></TextField>
                            </Grid>
                            <Grid xs ={12}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>อีเมลล์</Typography>
                                <TextField placeholder='email' size='small' style={{paddingBottom:5}} disabled value={user.email}></TextField>
                            </Grid>
                      
                        </Grid>
                       
                    </Grid> 
                       
                </Box>
                <Grid container >
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อ นามสกุล</Typography>
                            <TextField name='name' placeholder='name' size='small' style={{paddingBottom:5,fontFamily:'kanit-regular',width:"100%",fontFamily:'kanit-regular',fontSize:16 }} value={user && user.name}  onChange={onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ตำเเหน่ง</Typography>
                            <TextField name='position' placeholder='' size='small' style={{paddingBottom:5,fontFamily:'kanit-regular',width:"100%",fontFamily:'kanit-regular',fontSize:16 }} value={user && user.position}  onChange={onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>website</Typography>
                            <TextField name='website' placeholder='www...' size='small' style={{paddingBottom:5,fontFamily:'kanit-regular',width:"100%",fontFamily:'kanit-regular',fontSize:16 }} value ={user && user.website}  onChange={onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทรศัพท์</Typography>
                            <TextField name='tel' placeholder='tel' size='small' style={{paddingBottom:5,fontFamily:'kanit-regular',width:"100%",fontFamily:'kanit-regular',fontSize:16 }} value={user && user.tel}  onChange={onChange}></TextField>
                           
                            <Button variant="outlined" startIcon={<img
                                src={save}
                                width='20'
                                height='20'
                                loading="lazy"
                                style={{marginTop:0}}
                                />
                                
                            }
                                style={{fontStyle:'italic',backgroundColor:COLOR.white,color:COLOR.black,borderRadius:0,marginTop:20,border:'1px solid black',borderColor:COLOR.black,fontFamily:'kanit-medium',fontSize:16 }}
                                onClick = {async()=>
                                    {
                                        console.log(user);
                                        
                                        const res = await update_user(user)
                                        console.log(res);
                                        if(res.success){
                                            set_show_modal(true,1,'Success','update profile success')
                                            await loadUser()
                                        }
                                        else{
                                            set_show_modal(true,2,'Fail',res.msg)
                                            await loadUser()
                                        }
                                        
                                    }
                                }>
                                    SAVE
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >

                        <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ที่อยู่</Typography>
                        <TextField name='address' placeholder='name' size='small' style={{paddingBottom:5,width:"100%"}} multiline rows={3} onChange = {onChange} value={user && user.address} ></TextField>
                        <Grid container>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>จังหวัด</Typography>
                                <TextField name='province' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} value={user && user.province}  onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสไปรษณีย์</Typography>
                                <TextField name='passcode' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}}value={user && user.passcode}  onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทร</Typography>
                                <TextField name='tel_2' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} value={user && user.tel_2}  onChange = {onChange}></TextField>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>แฟกซ์</Typography>
                                <TextField name='fax' placeholder='' size='small' style={{paddingBottom:5,width:"90%"}} value={user && user.fax}  onChange = {onChange}></TextField>
                            </Grid>
                        </Grid>

                        </Box>
                    </Grid>
                </Grid>
                
            </Box>
            </>
            :
            <div></div>
             }
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{update_user,loadUser,save_avatar,get_user,set_show_modal})(Screen)
