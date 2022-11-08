import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {register_customer} from '../../../actions/auth'
import {set_show_modal} from '../../../actions/manager'
import Typography from '@mui/material/Typography';

import FileUploader from '../../../components/custom/file_upload'

import * as COLOR from '../../../utils/color';
import logo from '../../../resource/images/staff/customer/regis01.png';

import edit from '../../../resource/images/staff/customer/regis02.png';

import edit_2 from '../../../resource/images/staff/customer/regis03.png';

import save from '../../../resource/images/staff/head/29.png';
const Screen  = ({set_show_modal,register_customer}) => {
    const [isPerson,setIsPerson] = useState(true)

    const [user,setUser] = useState({})
    const [preview,setPreview] = useState(null)
    const history = useHistory()
    useEffect(async () => {
        
        
      },[]);
  
   
    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    const onChangeFile = async (e) =>{

        setPreview(URL.createObjectURL(e.target.files[0]))
        setUser({...user,avatar:e.target.files[0]})

        // if(e.target.files[0]){
        //     const res = await save_avatar({avatar:e.target.files[0],user_id:user._id})
        //     if(res.success){
        //         console.log(res)
        //         setPreview(res.data.avatar)
        //         setUser({...user,avatar:e.target.files[0]})
              
        //         console.log(e.target.files[0])
                
        //         set_show_modal(true,1,'Upload','upload image to server success.')
        //         if(auth.user.email == user.email){
        //             await loadUser()
        //         }
        //     }
        //     else{
        //         set_show_modal(true,2,'Upload','upload image to server fail.')
        //     }
        // }
       
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อมูลส่วนตัว</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black' , borderBottomWidth:0}}>
                   
                    <Grid >
                    <Button style={{marginLeft:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                        startIcon={ <img
                              src={edit}
                              width='30'
                              height='30'
                              loading="lazy"
                              
                        />}
                        onClick = {()=> setIsPerson(false)}
                        >
                        องค์กรหรือบริษัท
                    </Button>
                    <Button style={{marginLeft:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                        startIcon={ <img
                              src={edit_2}
                              width='30'
                              height='30'
                              loading="lazy"
                              
                        />}
                        onClick = {()=> setIsPerson(true)}>
                        ส่วนบุคคล
                    </Button>
                    </Grid>
                </Grid>

            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid'}}>
                
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
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อ/บัญชีผู้ใช้</Typography>
                                <TextField name='user_name' placeholder='user name' size='small'style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>อีเมลล์</Typography>
                                <TextField name='email' placeholder='email' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสผ่าน</Typography>
                                <TextField type='password' name='password' placeholder='password' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                            <Grid xs ={6}>

                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ยืนยันรหัสผ่าน</Typography>
                                <TextField type='password' name='confirm_password' placeholder='confirm password' size='small' style={{paddingBottom:5}} onChange = {onChange}></TextField>
                            </Grid>
                        </Grid>
                       
                    </Grid> 
                       
                </Box>
                <Grid container >
                    <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:20}} >
                            {isPerson ? 
                            <>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เลขบัตรประจำตัวประชาชน</Typography>
                                <TextField name='personal_id' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อ/นามสกุล</Typography>
                                <TextField name='name' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                            </>
                            :
                            <>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เลขประจำตัวผู้เสียภาษีอากร</Typography>
                                <TextField name='personal_id' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อบริษัท / หลักทรัพย์จดทะเบียน</Typography>
                                <TextField name='company' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                                <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อนามสกุล</Typography>
                                <TextField name='name' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                            </>
                            }
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ตำเเหน่ง</Typography>
                            <TextField name='position' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>website</Typography>
                             <TextField name='website' placeholder='' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>เบอร์โทรศัพท์</Typography>
                            <TextField name='tel' placeholder='tel' size='small' style={{paddingBottom:5,width:"100%"}} onChange = {onChange}></TextField>
                            <Button variant="outlined" startIcon={<img
                                src={save}
                                width='20'
                                height='20'
                                loading="lazy"
                                style={{marginTop:0}}
                                />}
                                style={{backgroundColor:COLOR.white,color:COLOR.black,borderRadius:0,marginTop:20,border:'1px solid black',borderColor:COLOR.black,fontFamily:'kanit-regular',fontSize:16 }}
                                onClick = {async()=>{
                                    if(!user.user_name){
                                        set_show_modal(true,2,'Please Correct Input.','user name require!')
                                    }
                                    else if(!user.email){
                                        set_show_modal(true,2,'Please Correct Input.','email require!')
                                    }
                                    else if(!user.name){
                                        set_show_modal(true,2,'Please Correct Input.','name require!')
                                    }
                                    else if(!user.password){
                                        set_show_modal(true,2,'Please Correct Input.','password require!')
                                    }
                                    else if(user.password != user.confirm_password){
                                        set_show_modal(true,2,'Please Correct Input.','password and confirm password need to be the same!')
                                    }
                                    else{
                                        const res = await register_customer(user)
                                        if(res.success){
                                           
                                            set_show_modal(true,1,'Success.','user add to system!')

                                            history.replace('/admin_customer/')
                                        }
                                        else{
                                            console.log(res.msg)
                                            set_show_modal(true,2,'Fail.',res.msg)
                                            
                                        }
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
export default connect(mapStateToProps,{register_customer,set_show_modal})(Screen)
