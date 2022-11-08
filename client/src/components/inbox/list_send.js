import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {list_customer_send_inbox} from '../../actions/inbox'
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

import * as COLOR from '../../utils/color';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import Pagination from '@mui/material/Pagination';
import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';

const Screen  = ({auth,list_customer_send_inbox}) => {
    const [inboxs,setInboxs] = useState( [])

    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [total,setTotal] = useState(0)

    const history = useHistory();
    useEffect(async () => {
        const res = await list_customer_send_inbox()
        if(res.success){
            setInboxs(res.data.list)
            setPage(res.data.page)
            setTotal(res.data.total)
        }
        
      },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>ข้อความ</Typography>

            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.soft,justifyContent:'left',borderWidth:2,borderStyle:'solid',borderColor:'black'}} >
      
                    <Grid  >
                        <Button style={{marginLeft:20,marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:130,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                           startIcon={ <img
                                src={plus}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}
                             onClick = {()=>{
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
                                
                            />}onClick = {()=>{
                                history.push('list_inbox')
                             }}>
                            INBOX
                        </Button>
                    </Grid>
                    <Grid>
                        <Button style={{marginRight:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:20,backgroundColor:COLOR.white,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={send}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />} >
                            SEND
                        </Button>
                    </Grid>
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,minWidth:800,borderWidth:2,borderStyle:'solid',borderColor:'black', borderTop:0}}>
                
                
                <Grid container style={{padding:20}}>
                    <Grid item={true} xs={4}style={{marginBottom:10}} container>
                                    <Grid>
                                    <img
                                    src={send}
                                    width='30'
                                    height='30'
                                    loading="lazy"
                                    
                                />
                                    </Grid>
                                <Grid>
                                        <Typography style={{fontSize:22,fontFamily:'kanit-medium',color:COLOR.brown,marginLeft:10}} >SEND</Typography>     
                                </Grid>
                        </Grid>
                    <Grid item={true} xs={12} >

                        {inboxs.length <=0 &&
                             <Grid>
                                <Typography style={{fontSize:22,fontFamily:'kanit-medium',color:COLOR.dark_green,marginLeft:10,textAlign:'center',marginTop:100}} >No Data.</Typography>     
                            </Grid>
                        }
                    <Table style={{backgroundColor:COLOR.white}}>
                        <TableBody>
                            {inboxs.map((data) =>{

                                return  <TableRow
                                key={data._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick = {()=>  history.push({pathname:'detail_inbox',state:{inbox_id:data._id}})}
                                >
                                <TableCell component="th" scope="row">
                                    <Typography style={{fontSize:18,fontFamily:'kanit-regular'}} >{data.subject}</Typography>   
                                </TableCell>
                                <TableCell align="right">
                                    
                                    <Typography style={{fontSize:18,fontFamily:'kanit-light'}} >{moment(data.create_date).format('D/M/yyyy')}</Typography>   </TableCell>
                                </TableRow>
                            })}
                           
                            
                        </TableBody>
                    </Table>

                    <Stack spacing={2} style={{marginTop:20}}>
                        {total/limit > 1 &&
                            <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                                    setPage(value);
                                    var query ={limit:limit,page:value}
                                    const res3 = await list_customer_send_inbox(query)
                                    if(res3.success){
                                        setInboxs(res3.data.list)
                                        setPage(res3.data.page)
                                        setTotal(res3.data.total)
                                    }
                            }}/>
                        }
                        
                    </Stack>

                    </Grid>
                   
                </Grid>
                           
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{list_customer_send_inbox})(Screen)
