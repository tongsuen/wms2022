import React,  {Fragment,useState,useEffect}  from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stock,create_note,set_show_modal,set_loading} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import QRCode from 'qrcode.react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


import UploadFileButton from '../custom/multi_upload'

import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const';
import moment from 'moment'
import edit from '../../resource/images/staff/customer/12.png';
import print from '../../resource/images/staff/head/28.png';
const Screen  = ({auth,get_stock,create_note,set_show_modal,set_loading}) => {
    const [stock,setStock] = useState(null)
    const [note,setNote] = useState()
    let { stock_id } = useParams();
    const history = useHistory();
    useEffect(async () => {

        const res = await get_stock({stock_id:stock_id})
        if(res.success) {
            setStock(res.data)
            setNote({...note,stock_id:stock_id})
        }
        
      },[]);
    const onChangeImages = files => {
        setNote({ ...note,images: files })
    };
    const onChangeDetail = e => {
        setNote({ ...note,detail: e.target.value })
    };
    
    if(stock == null){
        return (<div></div>)
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:800}}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>รายละเอียดสินค้า</Typography>
            <Grid container style={auth.user.admin ? {padding:10,marginTop:20,backgroundColor:COLOR.peach,height:70,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,justifyContent:'right',paddingRight:30} : {padding:10,marginTop:20,backgroundColor:COLOR.soft,height:70,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,justifyContent:'right',paddingRight:30}}>
                    {auth.user.admin && <Grid >
                        <Button style={{marginLeft:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:18,backgroundColor:COLOR.white,borderWidth:2,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={edit}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}

                            onClick = {()=>  history.push('/admin_edit_stock/'+stock._id)}>
                            EDIT
                        </Button>
                        <Button style={{marginLeft:30,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',width:120,fontSize:18,backgroundColor:COLOR.white,borderWidth:2,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={print}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}

                            onClick = {()=>  history.push('/admin_qr_code/'+stock._id)}>
                            PRINT
                        </Button>
                    </Grid>}
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid'}}>
               
                <Grid container space={2} style={{backgroundColor:COLOR.white,padding:20,paddingLeft:100}} >
                    <Grid xs={12} style={{padding:20}}>
                        <Box>
                            <QRCode value={BASE.SERVER + 'stock_detail/'+stock._id}  style={{display:'block',margin:'auto'}} />
                        </Box>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>Lot Number</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20,minHeight:40}}>{stock.inventory.lot_number ? stock.inventory.lot_number : '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>รหัสสินค้า</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.product_code ?stock.inventory.product_code : '-' }</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>ชื่อสินค้า</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20,minHeight:40}}>{stock.inventory.name ? stock.inventory.name : '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                       
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>หน่วยสินค้า (หลัก)</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.unit}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>หน่วยสินค้า (ย่อย)</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.sub_unit}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>น้ำหนัก</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.weight} KG</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>จำนวน</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.current_amount}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,padding:5}}>mfg date</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.mfg_date ? moment(stock.inventory.mfg_date).format('DD/MM/yyyy') : '-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>exp date</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{stock.inventory.exp_date ? moment(stock.inventory.exp_date).format('DD/MM/yyyy'):'-'}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>วันนำเข้า</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{moment(stock.inventory.create_date).format('DD/MM/yyyy')}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={12}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>ภาพถ่ายสินค้า</Typography>
                            </Grid>
                            <Grid item={true} xs={9}>
                                <Grid container>
                                {stock.inventory.images.map(img =>{
                                    return<Grid key={img} xs={4} style={{padding:10}} onClick ={()=> {
                                        const win = window.open(img, "_blank");
                                        win.focus();
                                        }}>
                                                <img width={200} height ={200} style={{objectFit:"contain"}} src={img}  />
                                        </Grid>
                                })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={12}  style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={12}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,padding:5}}>NOTES</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {stock.notes.map((note) =>{
                        return (
                          <Box key={note._id} style={{backgroundColor:COLOR.soft_green,padding:20,margin:10,borderRadius:20}} onClick={()=>{
                              history.push('/admin_edit_note/'+note._id)
                          }}>
                                   <ImageList variant="quilted" cols={4} gap={8}>
                                       
                                        {note.images.map(img=>{
                                           return <ImageListItem key={img} onClick ={()=> {
                                                    const win = window.open( img, "_blank");
                                                    win.focus();
                                                    }}>
                                                        <Image
                                                            src={`${img}`}
                                                            srcSet={`${img}`}
                                                            alt={''}
                                                            loading="lazy"
                                                            style={{maxWidth:200}}
                                                        />
                                                    </ImageListItem>
                                        })}
                                        </ImageList>
                                        <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>{note.detail}</Typography>
                                        {note.images.map(img=>{
                                           return <Box key={img} onClick ={()=> {
                                                    const win = window.open(img, "_blank");
                                                    win.focus();
                                                    }}>
                                                        <Typography style={{textAlign:"right",fontFamily:'kanit-medium',color:COLOR.green,fontSize:12}}>{img}</Typography>
                                                    </Box>
                                        })}

                                        <Typography style={{textAlign:"right",fontFamily:'kanit-medium',color:COLOR.dark_green,fontSize:14}} >{moment(note.create_date).format('DD/MM/yyyy')}</Typography>
                              </Box>
                              
                        )
                    })}
                    {auth.user.admin && <>
                        <Grid xs = {12}>
                                <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >       
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>หมายเหตุ <span style={{color:COLOR.red}}>*</span></Typography>
                                    <TextField placeholder='' size='small' style={{fontFamily:'kanit-regular',paddingBottom:5,width:"80%"}} multiline rows={3} onChange = {onChangeDetail}></TextField> 
                                    <br/>   
                                    
                                    <UploadFileButton onDeleteFile= {(files) => { setNote({ ...note,images: files }) }} multiple accept="image/png, image/jpeg, image/jpg"  onChange = {onChangeImages} name='images' design = {1} title='Add file/photo' />
                             
                                </Box>
                            </Grid>
                            
                            
                        
                            <Grid xs = {6}>
                                <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >
                                    <Button style={{backgroundColor:COLOR.white,color:COLOR.black,border:'1px solid black',fontFamily:'kanit-medium',fontSize:16 }}
                                    onClick = {async()=> {
                                        const res = await create_note(note);
                                        console.log(res);
                                        set_loading(true)
                                        if(res.success){
                                            set_show_modal(true,1,'Success','add note success')
                                            const res = await get_stock({stock_id:stock_id})
                                            if(res.success) {
                                                setStock(res.data)
                                            }
                                        }
                                        else{
                                            set_show_modal(true,2,'Fail','add note fail')
                                        }
                                        set_loading(false)
                                    }}>บันทึก</Button>
                                </Box>
                            </Grid>
                               
                    </>}

                    </Grid>  
                       
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stock,create_note,set_show_modal,set_loading})(Screen)
