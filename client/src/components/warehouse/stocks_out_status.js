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
import {get_users,export_stock,get_inventory,list_invoice,save_to_history} from '../../actions/manager'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';

import SearchInput from '../custom/search'
import * as COLOR from '../../utils/color';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
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
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  };
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Screen  = ({auth,get_users,get_inventory,export_stock,list_invoice,save_to_history}) => {
    const [stock,setStock] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)

    const [total,setTotal] = useState(0)

    const [search,setSearch] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    const render_status = (status) =>{
        if(status == 1){
            return   <Chip style={{fontFamily:'kanit-light',fontSize:14}} label="รอยืนยันดำเนินการ" size="small"  variant="outlined" />
        }
        else if(status == 2){
            return   <Chip style={{fontFamily:'kanit-light',fontSize:14}} label="ยืนยันเรียบร้อย" size="small"  variant="outlined" />
        }
        else {
            return   <Chip style={{fontFamily:'kanit-light',fontSize:14,color:COLOR.red}} label="ไม่ผ่าน" size="small"  />
        }
    }
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
            const res = await list_invoice({type:2,user:auth.user._id})
            console.log(res.data);
            if(res.success){
                setStock(res.data.list)
                //setPage(res.data.page)
                //setTotal(res.data.total)
            }
    
        }
       
        
      },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Status Check</Typography>
            <Grid container style={{padding:5,backgroundColor:COLOR.soft,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,marginTop:20}}>
                    <SearchInput  placeholder='search for..' onClick = {async (e,text)=>{
                            setSearch(text)
                           const res = await list_invoice({type:2,user:auth.user._id,search:text})
                           console.log(res.data);
                           if(res.success){
                               setStock(res.data.list)
                               //setPage(res.data.page)
                               //setTotal(res.data.total)
                           }
                     }}  />
            </Grid>

            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid'}}>
             
                
                <Grid container style={{padding:20,justifyContent:"center"}}>
                 
                    <Grid item={true} xs={12} >
                        <Typography align='left' style={{fontFamily:'kanit-medium',fontSize:20,color:COLOR.red}}>{moment().lang("th").format('MMMM')}, {moment().lang("th").format('yyyy')}</Typography>
                        <Typography align='left' style={{fontFamily:'kanit-medium',fontSize:20,color:COLOR.black,marginBottom:20}}>ประเภท - ขาออก</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{borderCollapse:'collapse'}}>
                            <TableHead>
                            <TableRow>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}} align="center">
                                 สถานะ
                                </StyledTableCell>
                               
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}} align="center">Lot.no.</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}} align="center">Product Code</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}} align="center">No.of</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}} align="center">Unit</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {stock && stock.map((row) => (
                                
                                <StyledTableRow key={row._id} >
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}} >
                                        {row.status == 0 && <Button variant='outlined' size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.soft_brown,fontFamily:'kanit-regular',fontSize:16}}>ยกเลิก</Button>}
                                        {row.status == 1 && <Button variant='outlined' size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.soft_green,fontFamily:'kanit-regular',fontSize:16}}>รอการยืนยัน</Button>}
                                        {row.status == 2 && <Button variant='outlined' color="success" size='small' style={{border:'1px solid black',color:COLOR.black,backgroundColor:COLOR.mint,fontFamily:'kanit-regular',fontSize:16}}>เสร็จสิ้น</Button>}
                                  
                                    </StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.lot_number}
                                    </StyledTableCell> 
                                    <StyledTableCell align="center"  style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.product_code? row.inventory.product_code : '-' }</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.unit}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Grid>
                   
                </Grid>
                           
            </Box>
          
                    
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{list_invoice})(Screen)
