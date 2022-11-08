import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {create_inbox} from '../../../actions/inbox'
import {list_customer,set_show_modal,set_loading} from '../../../actions/manager'
import Typography from '@mui/material/Typography';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';

import UploadFileButton from '../../custom/multi_upload'
import * as COLOR from '../../../utils/color';

import plus from '../../../resource/images/staff/head/21.png';
import save from '../../../resource/images/staff/head/22.png';
import send from '../../../resource/images/staff/head/23.png';
import request_icon from '../../../resource/images/staff/icon07.png';

const Screen  = ({create_inbox,list_customer,set_show_modal,set_loading}) => {
    const [inbox,setInbox] = useState( {type:2})
    const [customers,setCustomers] = useState( [])
    const [checkList,setCheckList] = useState([])
    const history = useHistory();
    useEffect(async () => {
        const res = await list_customer()
        console.log(res);
        if(res.success){
            setCustomers(res.data)
          
       
        }
        
      },[]);
  
      const onChangeFile = (files) =>{
        setInbox({ ...inbox,files: files })
        console.log(files)
    }
    const onChange = (e) =>{
        setInbox({...inbox,[e.target.name]:e.target.value})
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อความ</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0,marginTop:20}}>
                     <Grid >
                        <Button style={{marginLeft:5,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:140,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={request_icon}
                                width='30'
                                height='30'
                                loading="lazy"                
                            />}

                            onClick = {()=>  history.push('/admin_requests')}>
                            REQUEST
                        </Button>
                    </Grid>
                    <Grid >
                        <Button style={{marginLeft:15,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:130,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={plus}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}
                            onClick = {()=>  history.push('/admin_create_inbox')}>
                            CREATE
                        </Button>
                    </Grid>
                    <Grid>
                        <Button style={{marginLeft:15,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={save}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}
                            onClick = {()=>  history.push('/admin_list_inbox')}>
                            INBOX
                        </Button>
                    </Grid>
                  
                    <Grid >
                        <Button style={{marginLeft:15,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={send}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}
                            onClick = {()=>  history.push('/admin_list_send_inbox')}>
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,minWidth:850,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
               
                    
                <Box style={{width:'100%',minHeight:200,padding:20,alignItems:'center',justifyContent:'center',margin:'auto'}}>
                     <Box style={{minHeight:200,backgroundColor:COLOR.white,padding:20,margin:"auto",width:850}}>
                                <Grid container 
                                    style={{paddingLeft:30,width:600,alignItems:'center',justifyContent:'center'}}>
                                        <Grid item={true} xs={1}>
                                            <Checkbox   
                                            onChange ={(e)=>{
                                               if(e.target.checked){
                                                    var array = []
                                                    customers.map(customer =>{
                                                        array.push(customer._id)
                                                    })
                                                    setCheckList(array)
                                               }else{
                                                    
                                                  setCheckList([]);
                                               }
                                               
                                            }} />
                                        </Grid>
                                        <Grid xs={11} item={true} >
                                            <Typography style={{fontFamily:"kanit-medium",fontSize:20}}>รายชื่อลูกค้าทั้งหมด</Typography>
                                        </Grid>
                                </Grid>
                               
                                <Grid container 
                                    style={{padding:20}} align="center">
                      
                                    {customers.map((cus,index) =>{
                                        return  <Grid  key={cus._id} item={true} xs={6}style={{paddingLeft:0,paddingRight:10,minHeight:100}}>
                                                    <Grid  container align="left" style={{padding:10,borderTop:'solid 1px black',minHeight:100}}>
                                                        <Grid  xs={1} item={true}  style={{margin:'auto',width:50}}>
                                                            <Checkbox  
                                                             checked={checkList.lastIndexOf(cus._id) >= 0 ? true : false} 
                                                             value={cus._id}
                                                             onChange={e=> {
                                                                if (e.target.checked === true) {
                                                                    setCheckList([...checkList, e.target.value]);
                                                                } 
                                                                else {
                                                                    const selectedAcc = checkList.filter(a => {
                                                                      if (a === e.target.value) return false;
                                                                      return true;
                                                                    });
                                                                    setCheckList([...selectedAcc]);
                                                                }
                                                            }}/>
                                                        </Grid>
                                                        <Grid item={true} xs={3} style={{padding:10,width:60,paddingLeft:20}}>
                                                         
                                                                {cus.avatar ?   
                                                                <Box style={{backgroundColor:COLOR.white,width:60,height:6,borderRadius:"50%",margin:'auto'}}>
                                                                 <img
                                                                        src={cus.avatar}
                                                                        width='60'
                                                                        height='60'
                                                                        
                                                                        loading="lazy"
                                                                        style={{display: 'block',
                                                                        marginLeft: 'auto',
                                                                        marginRight: 'auto',
                                                                        objectFit:'cover',
                                                                        borderRadius:30,
                                                                            }}
                                                                    />
                                                      
                                                                </Box>:
                                                                 <Box style={{backgroundColor:COLOR.brown,width:60,height:60,borderRadius:"50%"}}>
                                                                 
                                                                </Box>
                                                                }
                                                        </Grid>
                                                        <Grid item={true} xs={8} style={{alignItems:'center',justifyContent:'center',margin:'auto',padding:0,paddingLeft:20}}>
                                                            <Typography style={{fontFamily:"kanit-regular",fontSize:20}}>{cus.name}</Typography>
                                                            <Typography style={{fontFamily:"kanit-regular",fontSize:18}}>{cus.email}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                    })}
                                    



                                </Grid>
                     </Box>
                </Box>
                <Grid container 
                    style={{padding:20,alignItems:'center',justifyContent:'center',width:850,backgroundColor:COLOR.white,margin:'auto'}}>
                      
                       
                        <Grid item={true} xs={12} >
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">เรื่อง</InputLabel>
                            <Input name='subject' id="component-simple" placeholder='Subject' onChange={onChange} style={{fontFamily:"kanit-medium",fontSize:22,backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,width:'100%'}} />
          
                        </Grid>
                       
                        <Grid xs={12} item={true} >
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18,marginTop:20}} htmlFor="component-simple">รายละเอียด</InputLabel>
                            <Input name='detail' id="component-simple" placeholder='Detail' multiline 
                                rows={4} onChange={onChange} style={{fontFamily:"kanit-medium",fontSize:22,backgroundColor:COLOR.white,marginTop:10,paddingLeft:10,marginBottom:20,width:'100%'}} />
          
                        </Grid>
                        <Grid xs={12} item={true} >
                            <InputLabel style={{fontFamily:"kanit-regular",fontSize:18}} htmlFor="component-simple">เเนบไฟล์/รูปภาพ</InputLabel>
                            
                            <UploadFileButton onDeleteFile= {(files) => {setInbox({ ...inbox,files:files })}} onChange = {onChangeFile} name='files' design = {1} title='Add file/photo' />
                                {/* <Input
                                    type="file"
                                    name='file'
                                    onChange = {onChangeFile}
                                /> */}
                                   {/* <Button style={{marginTop:10,marginBottom:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-regular',fontSize:15,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                                    >
                                    Add file/photo
                                </Button> */}
                        </Grid>
                        <Grid item={true} xs={12}>
                        <Button style={{marginTop: 20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:110,fontSize:18,backgroundColor:COLOR.peach,borderRadius:20}} 
                            onClick = {async()=>{
                                console.log(checkList)
                                set_loading(true)
                                const res = await create_inbox({...inbox,tos:checkList})
                                if(res.success){
                                   // set_show_modal(true,1,'Send','your message has been send.')
                                   history.push('/admin_list_send_inbox')
                                }
                                else{
                                    set_show_modal(true,2,'Fail',res.msg)
                                }
                                set_loading(false)

                                console.log(res)
                            }}>
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
export default connect(mapStateToProps,{create_inbox,list_customer,set_show_modal,set_loading})(Screen)
