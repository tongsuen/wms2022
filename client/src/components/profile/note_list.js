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
import {get_notes} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import * as COLOR from '../../utils/color';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import Pagination from '@mui/material/Pagination';
import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';
import note from '../../resource/images/icon/notes.png';

const Screen  = ({auth,get_notes}) => {
    const [list,setList] = useState( [])

    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [total,setTotal] = useState(0)

    const history = useHistory();

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: COLOR.red,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        }));

    useEffect(async () => {
        if(auth.user){
            const res = await get_notes({admin:auth.user.admin})
            if(res.success){
                setList(res.data.list)
                setPage(res.data.page)
                setTotal(res.data.total)
            }
        }
      },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>NOTES</Typography>

            <Grid container style={{height:60,padding:10,marginTop:20,backgroundColor:COLOR.soft,justifyContent:'left',borderWidth:2,borderStyle:'solid',borderColor:'black'}} >
                
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,minWidth:800,borderWidth:2,borderStyle:'solid',borderColor:'black', borderTop:0}}>
                
                
                <Grid container style={{padding:20}}>
                    <Grid item={true} xs={4}style={{marginBottom:10}} container>
                                    <Grid>
                                    <img
                                    src={note}
                                    width='30'
                                    height='30'
                                    loading="lazy"
                                    
                                />
                                    </Grid>
                                <Grid>
                                        <Typography style={{fontSize:22,fontFamily:'kanit-medium',color:COLOR.brown,marginLeft:10}} >NOTES</Typography>     
                                </Grid>
                        </Grid>
                    <Grid item={true} xs={12} >
                    <Table style={{backgroundColor:COLOR.white}}>
                    <TableHead>
                            <TableRow style={{border:'1px solid'}}>
                                {/* <StyledTableCell>
                                    <Checkbox
                                        style={{backgroundColor:COLOR.white}}
                                        color={COLOR.black}
                                        onChange = {(e) =>{
                                            console.log(e.target.checked);                              
                                        }}
                                    />
                                </StyledTableCell> */}
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>ชื่อสินค้า</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>จำนวน</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>ว/ด/ป</StyledTableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((data,index) =>{

                                return  <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick = {()=>{history.push('/stock_detail/'+data._id)}}
                                >
                                <TableCell component="th" scope="row" style={{border:'1px solid',}}>
                                    <Typography style={{fontSize:18,fontFamily:'kanit-regular'}} >{data.inventory.name}</Typography>   
                                </TableCell>    
                                 <TableCell component="th" scope="row" style={{border:'1px solid',}}>
                                    <Typography style={{fontSize:18,fontFamily:'kanit-regular'}} >{data.notes.length} note</Typography>   
                                </TableCell>
                                <TableCell align="right" style={{border:'1px solid',}}>
                                    
                                    <Typography style={{fontSize:18,fontFamily:'kanit-light'}} >{moment(data.create_date).format('D/M/yyyy')}</Typography>   </TableCell>
                                </TableRow>
                            })}
                           
                            
                        </TableBody>
                    </Table>

                    <Stack spacing={2} style={{marginTop:20}}>
                        {total/limit > 1 &&
                            <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                                    setPage(value);
                                    var query ={limit:limit,page:value,admin:auth.user.admin}
                                    const res3 = await get_notes(query)
                                    if(res3.success){
                                        setList(res3.data.list)
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
export default connect(mapStateToProps,{get_notes})(Screen)
