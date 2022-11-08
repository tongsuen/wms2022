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
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import * as COLOR from '../../../utils/color';
import moment from 'moment'
import logo from '../../../resource/images/data/dt01@1x.png';
import edit from '../../../resource/images/data/dt08@1x.png';

import home from '../../../resource/images/data/dt02@2x.png';
import letter from '../../../resource/images/data/dt03@2x.png';
import world from '../../../resource/images/data/dt04@2x.png';
import tel from '../../../resource/images/data/dt05@2x.png';
import phone from '../../../resource/images/data/dt06@2x.png';
import fax from '../../../resource/images/data/dt07@2x.png';

const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [user,setUser] = useState( {email:'test@gmail.com'})

    useEffect(async () => {
        
        
      },[]);
  
   

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:800}}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>รายละเอียดสินค้า</Typography>
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
                   
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid'}}>
               
                <Grid container space={2} style={{backgroundColor:COLOR.white,padding:20}} >
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ชื่อสินค้า</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5,backgroundColor:COLOR.soft_green,borderRadius:10}}>Toy of Join</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>รหัสสินค้า</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5,backgroundColor:COLOR.soft_green,borderRadius:10}}>F0FF342342</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>หน่วยสินค้า หลัก</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5,backgroundColor:COLOR.soft_green,borderRadius:10}}>BOX</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs ={6} style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>หน่วยสินค้าย่่อย</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5,backgroundColor:COLOR.soft_green,borderRadius:10}}>CANE</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>น้ำหนัก</Typography>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5,backgroundColor:COLOR.soft_green,borderRadius:10}}>3000 KG</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs ={6}  style={{padding:10}}>
                        <Grid item={true} xs={3}>
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>ภาพถ่ายสินค้า</Typography>
                        </Grid>
                        
                    </Grid>
                    <Grid xs = {12}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >       
                            <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>หมายเหตุ</Typography>
                            <TextField placeholder='' size='small' style={{fontFamily:'kanit-regular',paddingBottom:5,width:"80%"}} multiline rows={3}></TextField> 
                        </Box>
                    </Grid>
                    
                    
                   
                     <Grid xs = {6}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >
                            <Button style={{backgroundColor:COLOR.orange,color:COLOR.white}}>บันทึก</Button>
                        </Box>
                    </Grid>
                </Grid>         
                       
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{})(Screen)
