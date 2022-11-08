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
import {get_users,export_stock_prepare,get_inventory,get_stocks,save_to_history} from '../../actions/manager'
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

import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import SearchInput from '../custom/search'

import note_icon from '../../resource/images/staff/icon06.png';
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
const Screen  = ({auth,get_users,get_inventory,export_stock_prepare,get_stocks,save_to_history}) => {
    const [data,setData] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [checks,setChecks] = useState([])
    const [selectStock,setSelectStock] = useState(null)
    const [selectNumber,setSelectNumber] = useState(0)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = React.useState(false);
    const [search,setSearch] = useState(null)

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

        if(auth.user){
            const res = await get_stocks({user:auth.user._id})
            console.log(res);
            if(res.success){
                setData(res.data.list)
                setPage(res.data.page)
                setTotal(res.data.total)
            }
        }
    },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Warehouse</Typography>
            <Grid container style={{padding:5,backgroundColor:COLOR.soft,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0,marginTop:20}}>
                    <SearchInput  placeholder='search for..' onClick = {async (e,text)=>{
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
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
               
                
                <Grid container style={{padding:20,justifyContent:"center"}}>
                    <Grid item={true} xs={12} style={{marginBottom:10}} >
                               <Typography style={{fontSize:20,fontFamily:'kanit-regular'}} >- รายละเอียดสินค้า</Typography>     
                             
                    </Grid>
                    <Grid >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{borderCollapse:'collapse'}}>
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
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.noise_white,color:COLOR.black}}>Note</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Product Code</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Name</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>No.of</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black    }}>Unit</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}}>Mfg.date</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Exp.date</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.peach,color:COLOR.black}}>Zone</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Product</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody  style={{border:'1px solid'}} >
                            {data.map((row) => (
                                
                                <StyledTableRow  key={row._id} onClick = {()=>{history.push('/stock_detail/'+row._id)}}>
                                  
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid black',borderCollapse:'collapse',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.notes && 
                                       row.notes.length >0 && 
                                       <img src={note_icon} />}
                                    </StyledTableCell>            
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid black',borderCollapse:'collapse',fontFamily:'kanit-regular',fontSize:16}}>
                                   
                                      
                                     {row.inventory.lot_number} 
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.product_code ? row.inventory.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.current_amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',borderCollapse:'collapse',fontFamily:'kanit-regular',fontSize:16}}>     
                                            <Stack direction="row" spacing={1}>
                                            <Chip label={row.inventory.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{moment(row.inventory.mfg_date).format('YYYY-MM-D')}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{ moment(row.inventory.exp_date).format('YYYY-MM-D')}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.zone.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.images.map(img =>{
                                        return  <div key={img} style={{padding:5,textAlign:'center'}}><a href={img}  target="_blank">link</a></div>
                                    })}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack spacing={2} style={{marginTop:20}}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            var query ={limit:limit,page:value,user:auth.user._id}
                            if(search) query.search = search
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
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stocks,export_stock_prepare})(Screen)
