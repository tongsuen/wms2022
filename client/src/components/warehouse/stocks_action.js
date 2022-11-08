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
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../actions/manager'
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

import UploadFileButton from '../custom/multi_upload_2'
import SearchInput from '../custom/search'
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work


import IconButton from '@mui/material/IconButton';

import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import close from '../../resource/images/staff/head/26.png';
import accept from '../../resource/images/staff/head/25.png';
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
const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [data,setData] = useState( [])
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [search,setSearch] = useState(null)
    const [selectStock,setSelectStock] = useState(null)
    const [selectNumber,setSelectNumber] = useState(0)
    const [files,setFiles] = useState(null)
    const [total,setTotal] = useState(0)
    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] = useState(false)
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
  
    const onChangeFile = (files) =>{
        setFiles(files)
        console.log(files)
    }

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Out Bounds</Typography>

            <Grid container style={{padding:5,marginTop:20,backgroundColor:COLOR.soft,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}}>
                 
                    <SearchInput  placeholder='search for..' onClick = {async (e,text)=>{
                            setSearch(text)
                           const res = await get_stocks({user:auth.user._id,search:text})
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
                            <TableRow >
                                {/* <StyledTableCell>
                                    <Checkbox
                                        style={{backgroundColor:COLOR.white}}
                                        color={COLOR.black}
                                        onChange = {(e) =>{
                                            console.log(e.target.checked);                              
                                        }}
                                    />
                                </StyledTableCell> */}
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>actions</StyledTableCell>
                                <StyledTableCell style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.orange,color:COLOR.black}}>Lot.no.</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Product Code</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft_green,color:COLOR.black}}>Name</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.mint,color:COLOR.black}}>No.of</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green,color:COLOR.black}}>Unit</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.red,color:COLOR.black}}>Mfg.date</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.peach,color:COLOR.black}}>Exp.date</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.soft,color:COLOR.black}}>Zone</StyledTableCell>
                                <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.green_tea,color:COLOR.black}}>Product</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                
                                <StyledTableRow key={row.inventory.lot_number}>
                                   
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                    <ButtonGroup
                                         orientation="vertical" size="small" variant="outlined" aria-label="outlined button group">
                                         
                                                <Button  style={{border:'1px solid',backgroundColor:COLOR.soft_green,color:COLOR.black,fontFamily:'kanit-regular',fontSize:16}}  onClick = {()=>{
                                                    setSelectStock(row)  
                                                    setSelectNumber(row.current_amount)
                                                    setOpen(true)
                                                } }>export </Button>
                                             
                                              {/* {row.status == 2 &&
                                                <Button color="warning" style={{fontFamily:"kanit-medium",fontSize:12}}  onClick = {()=>{
                                                   
                                                } }>out {row.prepare_out} </Button>
                                             } */}
                                       
                                        {/* <Button>edit</Button> */}
                                    </ButtonGroup>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" component="th" scope="row" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>
                                        {row.inventory.lot_number}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.product_code ? row.inventory.product_code : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.inventory.name ? row.inventory.name : '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{row.current_amount}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>     
                                            <Stack direction="row" spacing={1}>
                                            <Chip style={{fontFamily:'kanit-regular',fontSize:16}} label={row.inventory.unit}  />
                                            </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{(row.inventory.mfg_date) ? moment(row.inventory.mfg_date).format('YYYY-MM-D'): '-'}</StyledTableCell>
                                    <StyledTableCell align="center" style={{border:'1px solid',fontFamily:'kanit-regular',fontSize:16}}>{ row.inventory.exp_date ? (moment(row.inventory.exp_date).format('YYYY-MM-D') +'('+ moment(row.inventory.exp_date).fromNow() +')'): '-' }</StyledTableCell>
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

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                sx={{
                    "& .MuiDialog-container": {
                      "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "430px",  // Set your width here
                      },
                    },
                  }}
            >
                {selectStock &&
                <>
                <Box style={{borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0,height:50,textAlign:'right',minWidth:320}}>
                    <IconButton> <img
                                onClick={handleClose}
                                src={close}
                                width='30'
                                height='30'
                                loading="lazy"
                                style={{marginTop:0,marginRight:0}}
                                /> </IconButton>
                            
                </Box>
                <DialogContent    style={{border:"2px solid black"}} >
                    <Grid container style={{marginBottom:20}}>
                        <Grid>
                               <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>ชื่อสินค้า</Typography> 
                        </Grid>
                        <Grid style={{minWidth:280}}>
                            <div style={{borderRadius:20,backgroundColor:COLOR.red,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"center"}}>{selectStock.inventory.name}</Typography> 
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginBottom:20}}>
                        <Grid>
                               <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>วันที่หมดอายุ</Typography> 
                        </Grid>
                        <Grid style={{minWidth:244}}>
                            <div style={{borderRadius:20,backgroundColor:COLOR.red,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,width:"100%"}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"center"}}>{moment(selectStock.inventory.exp_date).format("YYYY/MM/D")}</Typography> 
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container style={{marginTop:20}}>
                            {/* <Grid style={{paddingTop:10}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>จำนวน ใน หน่วยหลัก</Typography> 
                            </Grid>
                            <div style={{borderRadius:20,backgroundColor:COLOR.green,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,marginLeft:10,marginTop:10,minWidth:110}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:'center'}}>{selectStock.inventory.number_of_unit} {selectStock.inventory.unit}</Typography> 
                            </div> */}
                            <Grid style={{paddingTop:10}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>จำนวน ต่อ 1 {selectStock.inventory.unit} </Typography> 
                            </Grid>
                            <div style={{borderRadius:20,backgroundColor:COLOR.green,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,marginLeft:10,marginTop:10,minWidth:110}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:'center'}}>{selectStock.inventory.number_per_unit} {selectStock.inventory.sub_unit}</Typography> 
                            </div>
                            <Grid style={{paddingTop:10}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>จำนวน ในคลัง ทั้งหมด {selectStock.current_amount} {selectStock.inventory.sub_unit} </Typography> 
                            </Grid>
                    </Grid>
                    <Grid container style={{marginBottom:20}} >
                        <Grid>
                               <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,marginTop:15}}>นำออก</Typography> 
                        </Grid>
                        
                        <Grid align="center">
                            <div style={{borderRadius:20,backgroundColor:COLOR.green,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,marginLeft:10,marginTop:10,minWidth:140}}>
                           
                            {/* <CustomInput  value={selectNumber} onChange = {(e)=>{
                               
                                var number = Number(e.target.value);
                                console.log(number);
                                if(!number)  number = 0;
                                if(number > selectStock.current_amount) number = selectStock.current_amount
                                setSelectNumber(number);
                                
                            }}  /> */}

                            <input type="text" style={{fontFamily:"kanit-medium",fontSize:18,color:COLOR.white,backgroundColor:COLOR.white,color:COLOR.green,borderRadius:10,borderWidth:0,maxWidth:120,textAlign:'center'}} name="name" 
                                value={selectNumber} onChange = {(e)=>{
                               
                                var number = Number(e.target.value);
                                console.log(number);
                                if(!number)  number = 0;
                                if(number > selectStock.current_amount) number = selectStock.current_amount
                                setSelectNumber(number);
                             }}
                            />
                               {/* <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18}}>{selectStock.current_amount}</Typography> 
                           */}
                            </div>
                        </Grid>
                       
                        <Grid container style={{marginTop:20}}>
                            <Grid style={{paddingTop:10}}>
                                <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>เเนบเอกสาร</Typography> 
                            </Grid>
                            <Grid style={{minWidth:244,}}>
                                 <UploadFileButton onDeleteFile ={files => setFiles(files)}  onChange = {onChangeFile} name='files' design = {1} title='Add files' />
                            
                            </Grid>
                        </Grid>
                        
                    </Grid>
 
                     <DialogActions style={{justifyContent:"center"}} >
                                <IconButton> <img
                                onClick={ async ()=>{
                                    if(loading == false){
                                        var item = {stock_id:selectStock._id,amount:selectNumber,files:files}
                                        setLoading(true)
                                        const res = await export_stock(item)
                                        console.log(res)
                                        if(res.success){
                                            setOpen(false)
                                            var query ={limit:limit,page:page,user:auth.user._id}
                        
                                            const res3 = await get_stocks(query)
                                            if(res3.success){
                                                        setData(res3.data.list)
                                                        setPage(res3.data.page)
                                                        setTotal(res3.data.total)
                                            }
                                            setLoading(false)
                                        }else{
                                            alert(res.msg)
                                        }
                                    }
                                }}
                                src={accept}
                                width='40'
                                height='40'
                                loading="lazy"
                                style={{marginTop:10,marginRight:10}}
                                /> 
                                </IconButton>
                                <IconButton align="center"> <img
                                onClick={handleClose}
                                src={close}
                                width='40'
                                height='40'
                                loading="lazy"
                                style={{marginTop:10,marginRight:10}}
                                /> 
                                </IconButton>
                        </DialogActions>
                
                </DialogContent>
                
                </>
                }
             
            </Dialog>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stocks,export_stock})(Screen)
