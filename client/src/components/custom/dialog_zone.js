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

import {StyledOption} from './select_option'
import IconButton from '@mui/material/IconButton';


import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import edit from '../../resource/images/icon/edit.png';
import close from '../../resource/images/icon/close.png';
import accept from '../../resource/images/icon/correct.png';
import person from '../../resource/images/icon/ctm02.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogZone = ({zone,open=false,onClose}) =>{
    const history = useHistory()
    const [stock,setStock] = useState(null)
    const [selectStock,setSelectStock] = useState(0)
    useEffect(()=>{
        console.log(zone)
        if(zone && zone.stocks.length > 0){
            setStock(zone.stocks[0])
            setSelectStock(0)
        }
    },[zone])
    const handleClose = (e) =>{
         onClose(e)
         setStock(null)
         setSelectStock(0)
    }
    if(!zone) {
        return <></>
    }
    return <Dialog
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
            <Grid container style={{position:'relative',borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0,height:50,minWidth:320}}>
               <Grid style={{width:50}}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill='black' viewBox="0 0 24 24" stroke='black' strokeWidth={2} style={{marginLeft:10,height:40,width:"100%",paddingTop:4}}>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
               </Grid>
                <Grid>

                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:22,marginLeft:20,paddingTop:5}}>{stock && (stock.users[0].is_person ? stock.users[0].name : stock.users[0].company)}</Typography> 
                </Grid>
                <IconButton style={{position:"absolute",right:0}}> <img
                            onClick={handleClose}
                            src={close}
                            width='30'
                            height='30'
                            loading="lazy"
                            
                            /> 
                </IconButton>
                        
            </Grid>
            <DialogContent    style={{border:"2px solid black"}} >
                <Grid container style={{marginBottom:20}}>
                    <Grid>
                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>Zone:</Typography> 
                    </Grid>
                    <Grid style={{minWidth:280}}>
                        <div style={{borderRadius:20,backgroundColor:COLOR.white,color:COLOR.black,padding:5,paddingLeft:0,paddingRight:10}}>
                            <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"left"}}>{zone.name}</Typography> 
                        </div>
                    </Grid>
                </Grid>

                <Select
                    size="small"
                    onChange={(e)=>{ 
                        setSelectStock(e.target.value)
                        setStock(zone.stocks[e.target.value])
                    }}
                    label="stock"
                     value={selectStock}
                     style={{fontFamily:'kanit-regular',borderRadius:20,backgroundColor:COLOR.dark_green,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,width:"100%",height:40,marginBottom:20}}
                >
                   {zone.stocks.map((stk,index)=>{
                       return  <MenuItem key={stk._id} value={index}> {stk.name} </MenuItem>
                   })}
                </Select>
                {stock && <>
                <Grid container style={{marginBottom:20}}>
                    <Grid>
                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>ชื่อสินค้า</Typography> 
                    </Grid>
                    <Grid style={{minWidth:244}}>
                        <div style={{borderRadius:20,backgroundColor:COLOR.brown,color:COLOR.white,padding:5,paddingLeft:10,paddingRight:10,width:"100%"}}>
                            <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"center"}}>{stock.name}</Typography> 
                        </div>
                    </Grid>
                </Grid>
                <Grid container style={{marginBottom:20}}>
                    <Grid>
                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,paddingTop:5}}>Lot number</Typography> 
                    </Grid>
                    <Grid style={{minWidth:244}}>
                        <div style={{borderRadius:20,backgroundColor:'#f19b79',color:COLOR.black,padding:5,paddingLeft:10,paddingRight:10,width:"100%"}}>
                            <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"center"}}>{stock.lot_number}</Typography> 
                        </div>
                    </Grid>
                </Grid>
                <Grid container style={{marginBottom:20}} >
                    <Grid>
                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginRight:20,marginTop:5}}>จำนวน</Typography> 
                    </Grid>
                    <Grid style={{minWidth:144}}>
                        <div style={{borderRadius:20,backgroundColor:COLOR.mint,color:COLOR.black,padding:5,paddingLeft:10,paddingRight:10,width:"100%"}}>
                            <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,textAlign:"left"}}>{stock.current_amount}</Typography> 
                        </div>
                    </Grid>
                    <Grid>
                        <Typography style={{fontFamily:"kanit-medium",fontStyle:'italic',fontSize:18,marginLeft:10,marginTop:5}}>{stock.inventories[0].sub_unit}</Typography> 
                    </Grid>
                    
                </Grid>
                </>
                }
                <DialogActions style={{justifyContent:"center"}} >
                            <IconButton> <img
                            onClick={handleClose}
                            src={accept}
                            width='40'
                            height='40'
                            loading="lazy"
                            style={{marginTop:10,marginRight:10}}
                            /> 
                            </IconButton>
                            <IconButton align="center"> <img
                            onClick={()=>history.push('/admin_edit_stock/'+stock._id)}
                            src={edit}
                            width='40'
                            height='40'
                            loading="lazy"
                            style={{marginTop:10,marginRight:10}}
                            /> 
                            </IconButton>
                    </DialogActions>
            
            </DialogContent>
        </Dialog>
}

export default DialogZone;