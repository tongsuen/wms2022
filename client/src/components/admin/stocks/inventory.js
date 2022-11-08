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
import {get_users,set_show_modal,get_inventory,create_stock,get_zones_for_choose} from '../../../actions/manager'
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
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work

import SearchInput from '../../../components/custom/search'

import logo from '../../../resource/images/data/dt01@1x.png';

const Screen  = ({set_show_modal,create_stock,get_inventory,get_zones_for_choose}) => {
    const [data,setData] = useState([])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [zones,setZones] = useState([])
    const [selectZone,setSelectZone] = useState({})
    const [selectNumber,setSelectNumber] = useState(0)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleClose = () => {
        setOpen(false);
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
        
        const res = await get_inventory({is_in_stock:false})
        console.log(res);
        if(res.success){
            setData(res.data.list)
            setPage(res.data.page)
            setTotal(res.data.total)
        }
        const zones = await get_zones_for_choose()
        console.log(zones);
        if(zones.success){
            setZones(zones.data)
        }

    },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>สินค้ารอเข้าคลัง</Typography>

            <Grid container style={{padding:10,height:60,backgroundColor:COLOR.peach,marginTop:20,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
                 
                        {/* <SearchInput  placeholder='search for..' onClick = {(e,text)=>{
                            console.log(text)
                        }}  /> */}
            </Grid>

            <Box style={{backgroundColor:COLOR.gray,marginTop:0,borderWidth:2,borderStyle:'solid',minHeight:500}}>
                
                
                <Grid container style={{padding:20,justifyContent:'center'}}>
                    <Grid item={true} xs={12} style={{marginBottom:10}} >
                               <Typography style={{fontSize:20,fontFamily:'kanit-regular'}} >- รายละเอียดสินค้า</Typography>     
                             
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

                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',width:100,fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>Zone</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>Name</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Product Code</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>No.of</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.peach,color:COLOR.black}}>Unit</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>Mfg.date</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}}>Exp.date</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                
                                <StyledTableRow key={row.lot_number}>
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
                                     <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                         <Grid container>
                                            <Grid xs = {12}>
                                                <Select
                                                    id={row._id}
                                                    size="small"
                                                    onChange={(e)=>{ setSelectZone({...selectZone,[row._id]:e.target.value}) }}
                                                    label="zone"
                                                    value={selectZone[row._id]}
                                                    style={{height:30,width:80}}
                                                    >
                                                
                                                    {zones.map(data =>{
                                                        return  <MenuItem key={data._id} value={data._id}>{data.name}</MenuItem>
                                                    })}
                                                </Select>
                                            </Grid>
                                            <Grid xs = {12} style={{padding:5,justifyContent:'center'}}>
                                                <Chip
                                                    style={{height:30}}
                                                    label="IMPORT"
                                                    variant="outlined"
                                                    onClick={async()=>{
                                                        console.log();
                                                        const zone = selectZone[row._id]
                                                        if(zone){
                                                            const resss = await create_stock({inventory:row._id,zone:selectZone[row._id],amount:row.amount})
                                                            if(resss.success){
                                                                const res = await get_inventory({is_in_stock:false})
                                                                console.log(res);
                                                                if(res.success){
                                                                    setData(res.data.list)
                                                                    setPage(res.data.page)
                                                                    setTotal(res.data.total)
                                                                }
                                                                
                                                            }
                                                            else{
                                                                set_show_modal(true,2,'Fail','import fail')
                                                            }
                                                        }
                                                        else{
                                                            set_show_modal(true,2,'Zone','please, select zone')
                                                        }
                                                    }}
                                                    />
                                            </Grid>
                                         </Grid>
                                         
                                        
                                        
                                     </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.lot_number}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.name}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.product_code ? row.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>     
                                            <Stack direction="row" spacing={1} style={{justifyContent:'center'}}>
                                            <Chip label={row.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.mfg_date ? moment(row.mfg_date).format('DD/MM/YYYY') : '-'}</StyledTableCell>
                                    <StyledTableCell align="center"style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{ row.exp_date ? (moment(row.exp_date).format('YYYY-MM-D') +'('+ moment(row.exp_date).fromNow() +')'): '-' }</StyledTableCell>
                                
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
                            const res3 = await get_inventory(query)
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
export default connect(mapStateToProps,{get_inventory,create_stock,get_zones_for_choose,set_show_modal})(Screen)
