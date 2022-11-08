import React,  {Fragment,useState,useEffect}  from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_inbox} from '../../actions/inbox'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import * as COLOR from '../../utils/color';
import moment from 'moment'
import * as BASE from '../../utils/const';

import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';

const Screen  = ({auth,get_inbox}) => {
    const [inbox,setInbox] = useState(null)

    const history = useHistory();
    const location = useLocation();
    useEffect(async () => {
        
       // 
       if(location.state){
           console.log("location")
            console.log(location.state)
            const res = await get_inbox({inbox_id:location.state.inbox_id})
            console.log(res);
            
            if(res.success){
                setInbox(res.data)
            }
            
       }
      },[location.state]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อความ</Typography>

           
                {auth &&  <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.soft,justifyContent:'left',borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}} >
                        <Grid >

                        <Button style={{marginLeft:20,marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:130,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                                startIcon={ <img
                                    src={plus}
                                    width='30'
                                    height='30'
                                    loading="lazy"
                                    
                                />} onClick = {()=>{
                                    history.push(auth.user && auth.user.admin ? 'admin_create_inbox':'create_inbox')
                                }}>
                                CREATE
                            </Button>
                        </Grid>
                        <Grid>
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                                startIcon={ <img
                                    src={save}
                                    width='30'
                                    height='30'
                                    loading="lazy"
                                    
                                /> }onClick = {()=>{
                                    history.push(auth.user && auth.user.admin ? 'admin_list_inbox':'list_inbox')
                                }}>
                                INBOX
                            </Button>
                        </Grid>
                        <Grid item={true} xs={2} >
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                                startIcon={ <img
                                    src={send}
                                    width='30'
                                    height='30'
                                    loading="lazy"
                                    
                                />} onClick = {()=>{
                                    history.push(auth.user && auth.user.admin ? 'admin_list_send_inbox':'list_send_inbox')
                                }}>
                                SEND
                            </Button>
                        </Grid>
                         </Grid>
                        }
           
                

            <Box style={{backgroundColor:COLOR.gray,padding:20,minHeight:500,minWidth:810,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
           
                {inbox && 
                <Grid container 

                    style={{padding:20,marginTop:20,marginBottom:20,alignItems:'center',justifyContent:'center',width:800,margin:'auto',backgroundColor:COLOR.white}}>
                         <Grid item={true} xs={12} style={{padding:10}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">จาก (อีเมลล์)*</InputLabel>
                            <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{inbox.from ? inbox.from.email : 'tongsuen'}</Typography>
                        </Grid>
                        <Grid item={true} xs={12} style={{padding:10}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">ส่งถึง (อีเมลล์)*</InputLabel>
                            <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{inbox.to && inbox.to.email}</Typography>
                            {inbox.tos.map(to =>{
                            return  <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{to.email}</Typography>
                           
                        })}
                        </Grid>

                      
                        <Grid item={true} xs={12} style={{padding:10}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">เรื่อง</InputLabel>
                            <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{inbox.subject}</Typography>
          
                        </Grid>

                            {inbox.company &&

                        <Grid item={true} xs={12} style={{padding:10}}>
                             <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">บริษัท/เเบรนด์</InputLabel>
                             <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{inbox.company}</Typography>
                                
                        </Grid>
                            }
                           
                        <Grid item={true} xs={12} style={{padding:10}}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">รายละเอียด</InputLabel>
                            <Typography style={{fontFamily:"kanit-medium",fontSize:22}}>{inbox.detail}</Typography>
                        </Grid>
                        {inbox.files &&
                         <Grid item={true} xs={12}>
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18,marginBottom:10}} htmlFor="component-simple">ไฟล์/รูปภาพ</InputLabel>
                            {inbox.files.map((fs) =>{

                                return  <a key={fs} href={fs} style={{margin:5}}>
                                            <Chip avatar={<Avatar>F</Avatar>} label="files" />
                                        </a>
                            })}
                            
                        </Grid>
                        }
                       
                </Grid>
                }
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_inbox})(Screen)
