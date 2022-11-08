import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {get_users,export_stock_prepare,get_inventory,get_stocks,list_invoice} from '../../../actions/manager'
import SearchInput from '../../../components/custom/search'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import * as COLOR from '../../../utils/color';
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work


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

const Screen  = ({auth,get_users,get_inventory,export_stock_prepare,get_stocks,list_invoice}) => {
    const [data,setData] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [search,setSearch] = useState('')
    const [selectStock,setSelectStock] = useState(null)
    const [selectNumber,setSelectNumber] = useState(0)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const [start, setStart] = React.useState(new Date());

    const [end, setEnd] = React.useState(new Date());
    const handleChangeStart = (newValue) => {
        setStart(newValue);
    };
    const handleChangeEnd = (newValue) => {
        setEnd(newValue);
    };
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

        const res = await list_invoice({type:2})
        console.log(res);
        if(res.success){
            setData(res.data.list)
            setPage(res.data.page)
            setTotal(res.data.total)
        }

    },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Out Bounds</Typography>

            <Grid container style={{padding:5,backgroundColor:COLOR.peach,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0,marginTop:20}}>
                 
                     <SearchInput  placeholder='search for..' onClick = { async (e,text)=>{
                             setSearch(text)
                             const res = await list_invoice({type:2,search:text})
                             console.log(res);
                             if(res.success){
                                 setData(res.data.list)
                                 setPage(res.data.page)
                                 setTotal(res.data.total)
                             }
                        }}  />
           
             </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid'}}>
             
                
                <Grid container style={{padding:20}}>
                    <Grid item={true} xs={12} style={{marginBottom:10}} >
                               <Typography style={{fontSize:20,fontFamily:'kanit-regular'}} >- สินค้าออกคลัง</Typography>     
                             
                    </Grid>
                    <Grid container>
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <Grid item={true} xs= {6}>
                                    <DesktopDatePicker
                                        label="เริ่มจากวันที่"
                                        inputFormat="dd/MM/yyyy"
                                        value={start}
                                        onChange={handleChangeStart}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                            </Grid>
                            
                            <Grid item={true} xs= {6}>
                                    <DesktopDatePicker
                                        label="สิ้นสุดวันที่"
                                        inputFormat="dd/MM/yyyy"
                                        value={end}
                                        onChange={handleChangeEnd}
                                        renderInput={(params) => <TextField {...params} />}
                                        />
                            </Grid>
                        </LocalizationProvider > */}
                    <TableContainer component={Paper}  style={{marginTop:20}}>
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

                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>status.</StyledTableCell>  
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Product Code</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>No.of</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}}>Unit</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Zone</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>export date</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                
                                <StyledTableRow key={row._id}  onClick = {()=>  history.push('/invoice/'+row._id)}>
                                   
                                     <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                     {row.status == 0 && <Button variant='outlined' size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.soft_brown,fontFamily:'kanit-regular',fontSize:16}}>ยกเลิก</Button>}
                                        {row.status == 1 && <Button variant='outlined' size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.soft_green,fontFamily:'kanit-regular',fontSize:16}}>รอการยืนยัน</Button>}
                                        {row.status == 2 && <Button variant='outlined' color="success" size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.mint,fontFamily:'kanit-regular',fontSize:16}}>เสร็จสิ้น</Button>}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.lot_number}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.inventory.product_code ? row.inventory.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>     
                                            <Stack direction="row" spacing={1} style={{justifyContent:'center'}}>
                                            <Chip label={row.inventory.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{row.stock.zone.name}</StyledTableCell>
                                   
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:18}}>{moment(row.create_date).format('DD/MM/yyyy')}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={2} style={{marginTop:20}}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            var query ={limit:limit,page:value,type:2}
                            if(search) query.search = search
                            const res3 = await  list_invoice(query)
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

                   
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stocks,export_stock_prepare,list_invoice})(Screen)
