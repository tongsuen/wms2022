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
import {create_inbox} from '../../actions/inbox'
import {set_show_modal,set_loading} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import UploadFileButton from '../custom/multi_upload'
import * as COLOR from '../../utils/color';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';

const Screen  = ({auth,create_inbox,set_show_modal,set_loading}) => {
    const [inbox,setInbox] = useState({
        type:1,
    })

    const history = useHistory();
    useEffect(async () => {
        if(auth.user){
            setInbox({...inbox, from:auth.user._id})
        }
        
      },[]);
  
   
    const onChange = (e) =>{
        setInbox({...inbox,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    const onChangeFile = (files) =>{
        setInbox({ ...inbox,files: files })
        console.log(files)
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อความ</Typography>
       
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.soft,justifyContent:'left',borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}} >
                   
                    <Grid>
                        <Button style={{marginLeft:20,marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:130,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={plus}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}  onClick = {()=>{
                                history.push('create_inbox')
                             }}>
                            CREATE
                        </Button>
                    </Grid>
                    <Grid >
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={save}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            /> }onClick = {()=>{
                                history.push('list_inbox')
                             }}>
                            INBOX
                        </Button>
                    </Grid>
                    <Grid >
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={send}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />} onClick = {()=>{
                                history.push('list_send_inbox')
                             }}>
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,minWidth:800,borderWidth:2,borderStyle:'solid',borderColor:'black',}}>
                
                <Grid container 
                
                    style={{padding:20,alignItems:'center',justifyContent:'center',width:500,margin:'auto'}}>
                        <Grid item={true} xs={12}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">ส่งถึง</InputLabel>

                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">Tongsuen Team</InputLabel>
                            {/* <Input name='email' placeholder='E-mail' onChange={onChange} style={{backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,marginBottom:20,width:'100%'}} />
                            */}
                        </Grid>
                        <Grid item={true} xs={6} style={{marginTop:20}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">เรื่อง</InputLabel>
                            <Input name='subject' placeholder='Subject' onChange={onChange}  style={{ fontFamily:"kanit-medium",fontSize:22,backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,width:'100%'}} />
          
                        </Grid>
                        <Grid item={true} xs={6} style={{marginTop:20}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18,marginLeft:10}} htmlFor="component-simple">บริษัท/เเบรนด์</InputLabel>
                            <Input name='company' placeholder='Company/Brand' onChange={onChange}  style={{ fontFamily:"kanit-medium",fontSize:22,backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,marginLeft:10,width:'95%'}} />
          
                        </Grid>
                        <Grid item={true} xs={12} style={{marginTop:40}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">รายละเอียด</InputLabel>
                            <Input name='detail' placeholder='Detail' multiline 
                                rows={4} onChange={onChange} style={{ fontFamily:"kanit-medium",fontSize:22,backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,marginBottom:20,width:'100%'}} />
          
                        </Grid>
                        <Grid item={true} xs={12} style={{marginTop:20}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">เเนบไฟล์/รูปภาพ</InputLabel>
                            
                             <UploadFileButton onDeleteFile= {(files) => {setInbox({ ...inbox,files:files })}}   onChange = {onChangeFile} name='files' design = {1} title='Add file/photo' />
                                {/* <Input
                                    type="file"
                                    name='file'
                                    onChange = {onChangeFile}
                                />
                                   <Button style={{marginTop:10,marginBottom:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-regular',fontSize:15,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                                    >
                                    Add file/photo
                                </Button> */}
                        </Grid>
                        <Grid item={true} xs={12} >
                        <Button style={{marginTop: 20,borderRadius:20,color:COLOR.white,fontFamily:'kanit-medium',fontStyle:'italic',width:110,fontSize:20,backgroundColor:COLOR.brown,borderWidth:1,borderColor:COLOR.white,borderStyle:'solid'}} 
                            onClick = { async()=>{
                                console.log(inbox); 
                                if(!inbox.subject){
                                    set_show_modal(true,2,'Fail','Please put your subject')
                                }
                                else if(!inbox.detail){
                                    set_show_modal(true,2,'Fail','Please put your detail')
                                
                                }
                                else{
                                    set_loading(true)
                                    
                                    const res = await create_inbox(inbox)

                                    if(res.success){
                                        history.push('list_send_inbox')
                                    }
                                    else{
                                        set_show_modal(true,2,'Fail','message not send')
                                    }
                                    set_loading(false)
                                }
                            }}
                            >
                            SEND-
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{create_inbox,set_show_modal,set_loading})(Screen)
