import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect,useHistory} from 'react-router-dom'
import { styled } from '@mui/material/styles';
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {accept_invoice,list_stock_out_pending_confirm} from '../../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import * as COLOR from '../../../utils/color';
import moment from 'moment'
import logo from '../../../resource/images/data/dt01@1x.png';
import edit from '../../../resource/images/data/dt08@1x.png';

import plus from '../../../resource/images/staff/head/21.png';
import save from '../../../resource/images/staff/head/22.png';
import send from '../../../resource/images/staff/head/23.png';
import request_icon from '../../../resource/images/staff/icon07.png';
import accept_icon from '../../../resource/images/staff/icon04.png';
import decline_icon from '../../../resource/images/staff/icon05.png';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const Screen  = ({auth,list_stock_out_pending_confirm,accept_invoice}) => {
    const [list,setList] = useState( [])
    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(0)
    const [limit,setLimit] = useState(5)
    const [loading,setLoading] = useState(false)

    const history = useHistory();
    useEffect(async () => {
            const res = await list_stock_out_pending_confirm({limit:limit,page:page})
            console.log(res);
            if(res.success){
                setList(res.data.list)
                setPage(res.data.page)
                setTotal(res.data.total)
            }
        
      },[]);

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
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,minWidth:800,borderWidth:2,borderStyle:'solid'}}>
 
                <Grid container style={{padding:20}}>
                <Grid item={true} xs={4}style={{marginBottom:10}} container>
                                <Grid>
                                <img
                                src={request_icon}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />
                                </Grid>
                              <Grid>
                                    <Typography style={{fontSize:22,fontFamily:'kanit-medium',color:COLOR.brown,marginLeft:10}} >REQUEST</Typography>     
                              </Grid>
                    </Grid>
                    <Grid item={true} xs={12} >
                    <Table style={{backgroundColor:COLOR.white}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.soft_brown,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>ว/ด/ป</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.green,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>item code</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.soft,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>product name</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.green,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>lot number</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.soft,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>จำนวน</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:'#e6e6e5',fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>หน่วยหลัก</StyledTableCell>
                                <StyledTableCell  align='center' style={{border:'1px solid black',backgroundColor:COLOR.green,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>หน่วยย่อย</StyledTableCell>
                                <StyledTableCell  align='center' style={{border:'1px solid black',backgroundColor:COLOR.mint,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black}}>เอกสาร</StyledTableCell>
                                <StyledTableCell align='center' style={{border:'1px solid black',backgroundColor:COLOR.soft_brown,fontSize:22,fontFamily:'kanit-medium',fontStyle:'italic',color:COLOR.black,minWidth:120}}>ตอบรับคำขอ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {list && list.map(row =>{

                                return  <TableRow
                                key={row._id}

                                onClick = {()=>  history.push('/invoice/'+row._id)}
                                >
                               <TableCell component="th" scope="row" align='center' style={{border:'1px solid black',}}>
                                    <Typography style={{ fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {moment(row.create_date).format('DD/MM/yyyy')}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.inventory.product_code}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.inventory.name}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.inventory.lot_number}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.amount}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.inventory.unit}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.inventory.sub_unit}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center'style={{border:'1px solid black',}}>
                                    <Typography style={{fontSize:20,fontFamily:'kanit-regular',color:COLOR.black}} > {row.files && row.files.length}</Typography>   
                                </TableCell>
                                <TableCell component="th" scope="row" align='center' style={{backgroundColor:COLOR.white,padding:0,border:'1px solid black'}}>
                                    <Grid container style={{padding:0,height:62}} >
                                        <Grid item={true} xs={6} style={{backgroundColor:COLOR.green_tea,paddingTop:8}} >
                                             <IconButton onClick = {async()=>{
                                                 const res = await accept_invoice({invoice_id:row._id,action:1});
                                                 if(res.success){
                                                    const res2 = await list_stock_out_pending_confirm({limit:limit,page:page})
                                                    console.log(res2);
                                                    if(res2.success){
                                                        setList(res2.data.list)
                                                        setPage(res2.data.page)
                                                        setTotal(res2.data.total)
                                                    }
                                                 }
                                                 else{
                                                     alert(res.msg)
                                                 }
                                             }}>
                                                <img src={accept_icon} />
                                            </IconButton>
                                        </Grid>
                                        <Grid item={true} xs={6} style={{borderLeft:'1px solid black',paddingTop:8}}>
                                            <IconButton>
                                                <img src={decline_icon} onClick = {async()=>{
                                                    if(loading == false){
                                                        
                                                        setLoading(true)
                                                        const res = await accept_invoice({invoice_id:row._id,action:2});
                                                        if(res.success){
                                                            const res2 = await list_stock_out_pending_confirm({limit:limit,page:page})
                                                            console.log(res2);
                                                            if(res2.success){
                                                                setList(res2.data.list)
                                                                setPage(res2.data.page)
                                                                setTotal(res2.data.total)
                                                            }
                                                        }else{
                                                            alert(res.msg)
                                                        }
                                                        setLoading(false)
                                                    }
                                                 
                                             }}/>
                                            </IconButton>    
                                        </Grid>    
                                    </Grid>  
                                </TableCell>
                                </TableRow>

                            })}
                            
                          
                        </TableBody>
                    </Table>

                    <Stack spacing={2} style={{marginTop:20}}>
                        {total/limit > 1 &&
                            <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                                    setPage(value);
                                    var query ={limit:limit,page:value}
                                    const res2 = await list_stock_out_pending_confirm(query)
                                    console.log(res2);
                                    if(res2.success){
                                        setList(res2.data.list)
                                        setPage(res2.data.page)
                                        setTotal(res2.data.total)
                                    }
                            }}/>
                        }
                        
                    </Stack>

                    {list.length <=0 &&
                             <Grid>
                                <Typography style={{fontSize:22,fontFamily:'kanit-medium',color:COLOR.dark_green,marginLeft:10,textAlign:'center',marginTop:100}} >No Data.</Typography>     
                            </Grid>
                        }
                    </Grid>
                   
                </Grid>
                           
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{list_stock_out_pending_confirm,accept_invoice})(Screen)
