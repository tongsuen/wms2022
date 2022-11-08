import React,  {Fragment,useState,useEffect}  from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stock,get_invoice,set_show_modal} from '../../actions/manager'
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

import UploadFileButton from '../custom/multi_upload'

import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const';
import moment from 'moment'
import edit from '../../resource/images/staff/customer/12.png';
import print from '../../resource/images/staff/head/28.png';
const Screen  = ({auth,get_stock,get_invoice,set_show_modal}) => {
    const [invoice,setInvoice] = useState(null)
 
    let { invoice_id } = useParams();
    const history = useHistory();
    useEffect(async () => {
        console.log(invoice_id)
        const res = await get_invoice({invoice_id:invoice_id})
        console.log(res)
        if(res.success) {
            setInvoice(res.data)
        }
        
      },[invoice_id]);
    const type_text = () => {
        if(invoice.type == 1){
            return 'stock in'
        }
        else if(invoice.type == 2){
            return 'stock out'
        }
        else{
            return 'undefine'
        }
    }  
    const status_text = () => {
        if(invoice.status == 1){
            return 'pending'
        }
        else if(invoice.status == 2){
            return 'complete'
        }
        else if(invoice.status == 0){
            return 'decline'
        }
        else{
            return 'undefine'
        }
    }
    if(invoice == null){
        return (<div></div>)
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:800}}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Request Detail</Typography>
            <Grid container style={auth.user.admin ? {padding:10,marginTop:20,backgroundColor:COLOR.peach,height:70,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,justifyContent:'right',paddingRight:30} : {padding:10,marginTop:20,backgroundColor:COLOR.soft,height:70,borderWidth:2,borderStyle:'solid',borderBottomWidth:0,justifyContent:'right',paddingRight:30}}>
                  
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid'}}>
               
                 <Grid container space={2} style={{backgroundColor:COLOR.white,padding:20,paddingLeft:100}} >
                
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>type</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20,minHeight:40}}>{type_text()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,padding:5}}>จำนวน</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{invoice.amount}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>Lot number</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{invoice.inventory.lot_number}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>name</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{invoice.inventory.name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5}}>zone</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                {invoice.type == 1 &&
                                   <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{invoice.zone_in_name ? invoice.zone_in_name : '-'}</Typography>
    
                                }
                               {invoice.type == 2 &&
                                   <Typography style={{fontFamily:'kanit-medium',fontSize:20,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{invoice.zone_out_name ? invoice.zone_out_name : '-'}</Typography>
    
                                }</Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={3}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,padding:5}}>status</Typography>
                            </Grid>
                            <Grid item={true} xs={6}>
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:10,backgroundColor:COLOR.soft_green,borderRadius:20}}>{status_text()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs ={12} style={{padding:10}}>
                        <Grid container>
                            <Grid item={true} xs={12}>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20,padding:5}}>files</Typography>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    <Grid xs ={12}>
                                {invoice.files.map(file =>{
                                    return  <Box key={file}>
                                                <a href={file} style={{fontFamily:'kanit-medium',fontSize:16}}>{file}</a>
                                            </Box>
                                })}
                               
                    </Grid>
                </Grid>   
                       
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stock,get_invoice,set_show_modal})(Screen)
