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
import {get_users,export_stock_prepare,get_inventory,get_stocks,save_to_history} from '../../../actions/manager'
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
import IconButton from '@mui/material/IconButton';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import * as COLOR from '../../../utils/color';
import * as BASE from '../../../utils/const';
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import SearchInput from '../../../components/custom/search'

import logo from '../../../resource/images/data/dt01@1x.png';
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
const Screen  = ({auth,get_users,get_inventory,export_stock_prepare,get_stocks,save_to_history}) => {
    const [data,setData] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [search,setSearch] = useState(null)
    const [selectStock,setSelectStock] = useState(null)
    const [selectNumber,setSelectNumber] = useState(0)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
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
    useEffect(async () => {

        
        const res = await get_stocks()
        console.log(res);
        if(res.success){
            setData(res.data.list)
            setPage(res.data.page)
            setTotal(res.data.total)
        }

    },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Inventory</Typography>
            <Grid container style={{padding:5,backgroundColor:COLOR.peach,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
                        <SearchInput  placeholder='search for..' onClick= {async (e,text)=>{
                               setSearch(text)
                               const res = await get_stocks({search:text}) 
                               console.log(res);
                               if(res.success){
                                   setData(res.data.list)
                                   setPage(res.data.page)
                                   setTotal(res.data.total)
                               }
                        }}  />
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid'}}>
                
                
                <Grid container style={{padding:20,justifyContent:'center'}}>
                    <Grid item={true} xs={12} style={{marginBottom:10}} >
                               <Typography style={{fontSize:20,fontFamily:'kanit-regular'}} >- รายละเอียดสินค้า</Typography>     
                             
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button style={{fontFamily:'kanit-regular',fontSize:16,margin:20,border:'1px solid black',backgroundColor:COLOR.soft_green,color:COLOR.black}} variant="contained" color="success" onClick = {()=>  history.push('/admin_inventory')}>
                            สินค้ารอเข้าคลัง
                        </Button>
                        <Button style={{fontFamily:'kanit-regular',fontSize:16,margin:20,border:'1px solid black',backgroundColor:COLOR.green_tea,color:COLOR.black}} variant="contained" color="success"
                         onClick = {async()=> {
                            
                             if(loading == false){
                                setLoading(true)
                                const res = await save_to_history()
                                if(res.success){
                                    alert('save success')
                                }
                                else{
                                    alert('fail')
                                }
                                setLoading(false)
                             }
                           
                        }}>
                            บันทึกสินค้าคงคลัง ประจำวันที่ {moment().format('DD/MM/YYYY')}
                        </Button>
                    </Grid>     
                    <Grid >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{borderCollapse:'collapse'}}>
                            <TableHead>
                            <TableRow>
                                {/* <StyledTableCell>
                                    <Checkbox
                                        style={{backgroundColor:COLOR.white}}
                                        color={COLOR.black}
                                        onChange = {(e) =>{
                                            console.log(e.target.checked);                              
                                        }}
                                    />
                                </StyledTableCell> */}

                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>noted.</StyledTableCell>  
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft_brown,color:COLOR.black}}>Name.</StyledTableCell>
                                <StyledTableCell align="right"style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Product Code</StyledTableCell>
                                <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.peach,color:COLOR.black}}>No.of</StyledTableCell>
                                <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}}>Unit</StyledTableCell>
                                <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>Mfg.date</StyledTableCell>
                                <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Exp.date</StyledTableCell>
                                <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green_tea,color:COLOR.black}}>Zone</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data && data.map((row) => (
                                
                                <StyledTableRow key={row._id}  onClick = {()=>{history.push('/stock_detail/'+row._id)}}>
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
                                     <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                       {row.notes && 
                                       row.notes.length >0 && 
                                       <IconButton>
                                                <NoteAltIcon />
                                        </IconButton>} 
                                    </StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.lot_number}
                                    </StyledTableCell>

                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.inventory.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.inventory.product_code ? row.inventory.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.current_amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>     
                                            <Stack direction="row" spacing={1}>
                                            <Chip  style={{fontFamily:'kanit-regular',fontSize:16}} label={row.inventory.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{ row.inventory.mfg_date ? moment(row.inventory.mfg_date).format('YYYY-MM-D'): '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{ row.inventory.exp_date ? (moment(row.inventory.exp_date).format('YYYY-MM-D') +'('+ moment(row.inventory.exp_date).fromNow() +')'): '-' }</StyledTableCell>
                                       <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.zone.name}</StyledTableCell>
                                    {/* <StyledTableCell align="right" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>

                                    {row.inventory.images.map(img =>{
                                        return  <div style={{padding:5}}><a href={img}  target="_blank">link</a></div>
                                    })}
                                    </StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={2} style={{marginTop:20}}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            var query ={limit:limit,page:value}
                            if(search){
                                query.search = search
                            }
                            const res3 = await get_stocks(query)
                            if(res3.success){
                                setData(res3.data.list)
                                setPage(res3.data.page)
                                setTotal(res3.data.total)
                            }
                    }}/>
                }
                
            </Stack>
                    </Grid>
                   
                </Grid>
                           
            </Box>

            <Dialog
                in={open}
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
                        if(search){
                            query.search = search
                        }
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
export default connect(mapStateToProps,{get_stocks,export_stock_prepare,save_to_history})(Screen)
