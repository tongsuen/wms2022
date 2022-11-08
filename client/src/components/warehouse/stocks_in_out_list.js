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
import {get_users,export_stock_prepare,list_invoice,get_stocks,save_to_history} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Checkbox from "@material-ui/core/Checkbox";
import { styled } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';

import SearchInput from '../custom/search'
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import * as COLOR from '../../utils/color';
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work


import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';
var check_array = []
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const StyledInputElement = styled('input')`
  width: 200px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
  background: #eaeef3;
  border-color: #e5e8ec;
  }

  &:focus {
  outline: none;
  width: 220px;
  transition: width 200ms ease-out;
  }
`;
const StyledInputElementSearch = styled('input')`
  width: 200px;
  font-size: 1rem;
  font-family:kanit-regular;
  font-weight: 400;
  line-height: 1.4375em;
  background: 'white';
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
  background: #eaeef3;
  border-color: #e5e8ec;
  }

  &:focus {
  outline: none;
  width: 220px;
  transition: width 200ms ease-out;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <Input components={{ Input: StyledInputElement }} {...props} ref={ref} />
    );
  });
const Screen  = ({auth,list_invoice,get_inventory,export_stock_prepare,get_stocks,save_to_history}) => {
    const [data,setData] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [search,setSearch] = useState(null)
    const [selectStock,setSelectStock] = useState(null)
    const [selectNumber,setSelectNumber] = useState(0)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (stock) => {
        setSelectStock(stock)
        setSelectNumber(stock.current_amount)
        setOpen(true);
      };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: COLOR.red,
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


    const [type, setType] = useState(0);
    useEffect(async () => {
        if(auth.user){
            const res = await list_invoice({user:auth.user._id})
            console.log(res);
            if(res.success){
                setData(res.data.list)
                setPage(1)
                setTotal(res.data.total)
            }
        }
    },[]);
  

    const handleChange = async (event) => {
        setType(event.target.value);
        if(event.target.value == 0){
            const res = await list_invoice({user:auth.user._id})
            console.log(res);
            if(res.success){
                setData(res.data.list)
                setPage(1)
                setTotal(res.data.total)
            }
        }
        else if(event.target.value == 1){
            const res = await list_invoice({type:1,user:auth.user._id})
            console.log(res);
            if(res.success){
                setData(res.data.list)
                setPage(1)
                setTotal(res.data.total)
            }
        }
        else{
            
                const res = await list_invoice({type:2,user:auth.user._id})
                console.log(res);
                if(res.success){
                    setData(res.data.list)
                    setPage(1)
                    setTotal(res.data.total)
                }
        }
    };

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>History</Typography>
            <Grid container style={{padding:5,backgroundColor:COLOR.soft,borderWidth:2,borderStyle:'solid',borderColor:'black',marginTop:20,borderBottomWidth:0}}>
                 
                    <SearchInput  placeholder='search for..' onClick = {async (event,text)=>{
                            setSearch(text)
                            console.log(type)
                            if(type == 0){
                                const res = await list_invoice({user:auth.user._id,search:text})
                                console.log(res);
                                if(res.success){
                                    setData(res.data.list)
                                    setPage(1)
                                    setTotal(res.data.total)
                                }
                            }
                            else if(type == 1){
                                const res = await list_invoice({type:1,user:auth.user._id,search:text})
                                console.log(res);
                                if(res.success){
                                    setData(res.data.list)
                                    setPage(1)
                                    setTotal(res.data.total)
                                }
                            }
                            else{
                                
                                    const res = await list_invoice({type:2,user:auth.user._id,search:text})
                                    console.log(res);
                                    if(res.success){
                                        setData(res.data.list)
                                        setPage(1)
                                        setTotal(res.data.total)
                                    }
                            }
                    }}  />
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
                
                
                <Grid container style={{padding:20,justifyContent:"center"}}>
                    <Grid item={true} xs={12} style={{marginBottom:10}} >
                               <Typography style={{fontSize:20,fontFamily:'kanit-regular'}} >- รายละเอียดสินค้า</Typography>     
                             
                    </Grid>
                    <Grid >
                    <FormControl style={{width:300,margin:10}} >
                        <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handleChange}
                        style={{fontFamily:'kanit-medium'}}
                        > 
                        <MenuItem  value={0}>ทั้งหมด</MenuItem>
                        <MenuItem value={1}>สินค้าเข้าคลัง</MenuItem>
                        <MenuItem value={2}>สินค้าออกคลัง</MenuItem>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{borderCollapse:'collapse'}}>
                            <TableHead>
                                <TableRow>
                                
                                    <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}></StyledTableCell>
                                    <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Product Code</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Product Name</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>No.of</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.peach,color:COLOR.black}}>Unit</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Create.date</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                
                                <StyledTableRow key={row._id} style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                    {/* <StyledTableCell align="right" >
                                         <Checkbox
                                            onChange = {(e) =>{
                                                console.log(row._id);
                                                const check = e.target.checked;
                                                if(check){
                                                    check_array.push({stock:row._id,amount:row.current_amount})
                                                }
                                                else{
                                                    check_array =  check_array.filter(item => item.stock !== row._id);
                                                }
                                                console.log(check_array);
                                                
                                                // if(check){
                                                //     setStocks([...stocks,{stock:row._id,amount:row.current_amount}])
                                                // }
                                                // else {
                                                //     setStocks(stocks.filter(item => item.stock !== row._id));
                                                // }
                                            }}
                                        />
                                    </StyledTableCell> */}
                                    {/* <StyledTableCell>
                                    <ButtonGroup
                                         orientation="vertical" size="small" variant="outlined" aria-label="outlined button group">
                                             {row.status == 1 &&
                                                <Button   style={{fontFamily:"kanit-medium"}}  onClick = {()=>{
                                                    setSelectStock(row)  
                                                    setSelectNumber(row.current_amount)
                                                    setOpen(true)
                                                } }>export </Button>
                                             }
                                              {row.status == 2 &&
                                                <Button color="warning" style={{fontFamily:"kanit-medium",fontSize:12}}  onClick = {()=>{
                                                   
                                                } }>out {row.prepare_out} </Button>
                                             }
                                       
                                    </ButtonGroup>
                                    </StyledTableCell> */}
                                     <StyledTableCell component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.type == 1 ?  <Chip style={{fontFamily:'kanit-medium',fontSize:12}} label={'เข้าคลัง'}  variant="outlined"  />: <Chip  style={{fontFamily:'kanit-medium',fontSize:12}}label={'ออกคลัง'} variant="outlined" />}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.lot_number}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.product_code ? row.inventory.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.amount }</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>     
                                            <Stack direction="row" spacing={1}>
                                            <Chip label={row.inventory.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center"style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{moment(row.inventory.create_date).format('YYYY-MM-D')} ({moment(row.create_date).fromNow()})</StyledTableCell>

                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={2} style={{marginTop:20}}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            
                            if(type == 1){
                                var query ={limit:limit,page:value,type:1,user:auth.user._id}
                                if(search) query.search = search
                                const res3 = await list_invoice(query)
                                if(res3.success){
                                    setData(res3.data.list)
                                    setPage(res3.data.page)
                                    setTotal(res3.data.total)
                                }
                            }
                            else if(type == 0){
                                var query ={limit:limit,page:value,user:auth.user._id}
                                if(search) query.search = search
                                const res3 = await list_invoice(query)
                                if(res3.success){
                                    setData(res3.data.list)
                                    setPage(res3.data.page)
                                    setTotal(res3.data.total)
                                }
                            }
                            else{
                                var query ={limit:limit,page:value,type:2,user:auth.user._id}
                                if(search) query.search = search
                                const res3 = await list_invoice(query)
                                if(res3.success){
                                    setData(res3.data.list)
                                    setPage(res3.data.page)
                                    setTotal(res3.data.total)
                                }
                            }
                           
                    }}/>
                }
                
            </Stack>
                    </Grid>
                   
                </Grid>
                           
            </Box>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{""}</DialogTitle>
                {selectStock &&
                <DialogContent>
                    <Grid container style={{marginBottom:20}}>
                        <Grid>
                               <Typography style={{fontFamily:"kanit-regular",fontSize:16,marginRight:20}}>ชื่อสินค้า</Typography> 
                        </Grid>
                        <Grid>
                            <div style={{borderRadius:10,backgroundColor:COLOR.red,color:COLOR.white,padding:5,fontFamily:"kanit-regular",fontSize:12,paddingLeft:10,paddingRight:10}}>
                            <Typography style={{fontFamily:"kanit-regular",fontSize:12}}>{selectStock.inventory.name}</Typography> 
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginBottom:20}}>
                        <Grid>
                               <Typography style={{fontFamily:"kanit-regular",fontSize:16,marginRight:20}}>วันที่หมดอายุ</Typography> 
                        </Grid>
                        <Grid>
                            <div style={{borderRadius:10,backgroundColor:COLOR.red,color:COLOR.white,padding:5,fontFamily:"kanit-regular",fontSize:12,paddingLeft:10,paddingRight:10}}>
                            <Typography style={{fontFamily:"kanit-regular",fontSize:12}}>{moment(selectStock.inventory.exp_date).format("YYYY/MM/D")}</Typography> 
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginBottom:20}}>
                        <Grid>
                               <Typography style={{fontFamily:"kanit-regular",fontSize:16,marginRight:20}}>จำนวน</Typography> 
                        </Grid>
                        <Grid>
                            <div style={{borderRadius:10,color:COLOR.white,padding:5,fontFamily:"kanit-regular",fontSize:12,paddingLeft:10,paddingRight:10}}>
                            <CustomInput  value={selectNumber} onChange = {(e)=>{
                               
                                var number = Number(e.target.value);
                                console.log(number);
                                if(!number)  number = 0;
                                if(number > selectStock.current_amount) number = selectStock.current_amount
                                setSelectNumber(number);
                                
                            }}  />
                            </div>
                        </Grid>
                        <Grid>
                            <div style={{borderRadius:10,backgroundColor:COLOR.green,color:COLOR.white,padding:5,fontFamily:"kanit-regular",fontSize:12,paddingLeft:10,paddingRight:10,marginLeft:10,marginTop:10}}>
                                <Typography style={{fontFamily:"kanit-regular",fontSize:12}}>Stock = {selectStock.current_amount}</Typography> 
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                }
                <DialogActions>
                <Button onClick={ async ()=>{
                    
                    var item = {stock_id:selectStock._id,amount:selectNumber}
                    const res = await export_stock_prepare(item)
                    console.log(res)
                    if(res.success){
                       
                        var query ={limit:limit,page:page}
    
                        const res3 = await get_stocks(query)
                        if(res3.success){
                                    setData(res3.data.list)
                                    setPage(res3.data.page)
                                    setTotal(res3.data.total)
                        }
                    }
                   
                }}>export</Button>
                <Button onClick={handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stocks,export_stock_prepare,list_invoice})(Screen)
