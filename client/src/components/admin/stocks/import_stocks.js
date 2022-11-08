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
import {get_users,create_inventory,get_inventory,get_stocks,list_customer,set_show_modal,set_loading} from '../../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BootstrapInput from '../../../components/custom/textfield'
import UploadFileButton from '../../../components/custom/multi_upload'
import InputLabel from '@mui/material/InputLabel';

import * as COLOR from '../../../utils/color';
import moment from 'moment'
import logo from '../../../resource/images/data/dt01@1x.png';
import edit from '../../../resource/images/data/dt08@1x.png';

import save from '../../../resource/images/staff/head/31.png';
const Screen  = ({auth,create_inventory,get_inventory,export_stock,set_loading,list_customer,set_show_modal}) => {
    const [inv,setInv] = useState( {user:null,weight:0,product_code:'',number_of_unit:10})
    const [customers,setCustomers] = useState([])
    const history = useHistory();
    useEffect(async () => {
        const res = await list_customer()
        if(res.success){
            setCustomers(res.data)
        }
        
      },[]);
    const onChangeImages = files => {
  
        setInv({ ...inv,images: files })
    };
    const onChange = e => {
        console.log(e.target.value)
        setInv({ ...inv,[e.target.name]:e.target.value})   
    };
    const handleChangeCustomer = (e) => {
        setInv({ ...inv,user:e.target.value})
      };
    const random_data = () =>{
        const names = ['iPhone XS','Samsung Galaxy 12','Note 10','Xiomei Red','iPhone 9','iphone 13','Nokia 3310']
        const units = ['Box','Cane','Gallon']
        const date = Math.floor(Math.random() * (31 - 1)) + 1
        const month = Math.floor(Math.random() * (12 - 1)) + 1
        const year = Math.floor(Math.random() * (2019 - 1900)) + 1900
        const year2 = Math.floor(Math.random() * (2100 - 2022)) + 2022

        const mfg = date +'/' + month + '/'+year;
        const exp = date +'/' + month + '/'+year2;
        setInv({
            lot_number:Math.floor(Math.random() * 1000000000),
            product_code:Math.floor(Math.random() * 1000000000),
            name:names[Math.floor(Math.random()*names.length)],
            unit:units[Math.floor(Math.random()*units.length)],
            sub_unit:units[Math.floor(Math.random()*units.length)],
            amount:Math.floor(Math.random() * 1000),
            weight:Math.floor(Math.random() * 10000),
            exp_date:exp,
            mfg_date:mfg,
            user:customers[Math.floor(Math.random()*customers.length)]._id

        })
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>เพิ่มสินค้าเข้าคลัง</Typography>
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
          </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid'}}>
               
                <Grid container style={{backgroundColor:COLOR.white,padding:20,paddingLeft:"10%",paddingRight:'10%',minWidth:1450}} >
                    <Grid item={true} xs={12} style={{marginBottom:40}}>
                    <FormControl fullWidth>
                        <InputLabel style={{fontFamily:"kanit-regular"}}>owner</InputLabel>
                        <Select
                        size="small"
                        value={inv.user ? inv.user:''}
                        onChange={handleChangeCustomer}
                        style={{fontFamily:'kanit-regular',fontSize:16,maxWidth:200 ,padding:5}}
                        >
                        {customers.map(customer =>{
                            return <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
                        })}
                        
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                            <Grid item={true}>
                                <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>Lot number</Typography>
                            </Grid>   
                            <Grid item={true}>
                                <BootstrapInput name="lot_number" value={inv.lot_number} placeholder='E-A001' size='small'  onChange = {onChange}></BootstrapInput> 
                            </Grid>  
                        </Grid>
                    </Grid>
                 
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>รหัสสินค้า</Typography>
                                </Grid>   
                                <Grid item={true}>
                                    <BootstrapInput  name="product_code" value={inv.product_code} placeholder='123xCE34321' size='small' onChange = {onChange}></BootstrapInput>
                                </Grid>  
                        </Grid>
                       
                    </Grid>
                    <Grid xs = {6} item={true}>
                         <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>ชื่อสินค้า</Typography>
                                </Grid>   
                                <Grid item={true}>
                                    <BootstrapInput name="name" placeholder='Television' value={inv.name} size='small' onChange = {onChange}></BootstrapInput>  
                                </Grid>  
                        </Grid>
            
                    </Grid>
                    <Grid xs = {6} item={true}>
                        </Grid>
                    <Grid xs = {6} item={true}>

                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>หน่วยสินค้า (หลัก)</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput name="unit" value={inv.unit} placeholder='Box' size='small' onChange = {onChange}></BootstrapInput> 
                                </Grid>  
                        </Grid>

                    </Grid>
                   
                
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>หน่วยสินค้า (ย่อย)</Typography>
                                </Grid>   
                                <Grid>   
                                     <BootstrapInput name="sub_unit" value={inv.sub_unit} placeholder='Can' size='small' onChange = {onChange}></BootstrapInput> 
                                </Grid>  
                        </Grid>
                    </Grid>
                  <Grid xs = {6} item={true}>

                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>จำนวน (หลัก)</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput name="number_of_unit" value={inv.number_of_unit} placeholder='10' size='small' onChange = {onChange}></BootstrapInput> 
                                </Grid>  
                        </Grid>

                    </Grid>
              
                     <Grid xs = {6} item={true}>

                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>จำนวนต่อหนึ่งหน่วย</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput name="number_per_unit" value={inv.number_per_unit} placeholder='100' size='small' onChange = {(e)=>{
                                        const iu  = inv.number_of_unit
                                        const num = e.target.value
                                        const total = iu* num
                                        setInv({ ...inv,number_per_unit:e.target.value,amount:total})  
                                    }}></BootstrapInput> 
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:12,color:COLOR.green ,padding:5,marginRight:20}}>เช่นหนึ่งกล่อง มี 10ชิ้น </Typography>
                                </Grid>  
                        </Grid>

                    </Grid>
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>จำนวน (ย่อย)</Typography>
                                </Grid>   
                                <Grid item={true}>   
                                     <BootstrapInput name="amount" value={inv.amount} placeholder='100' size='small' style={{paddingBottom:5,width:"80%"}} onChange = {onChange} disabled></BootstrapInput>
                                     <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:12,color:COLOR.green ,padding:5,marginRight:20}}>จำนวนหน่วยหลักทั้งหมด x จำนวนต่อหนึ่งหน่วย เช่น 10 * 50 = 500 </Typography>
                               </Grid>  
                        </Grid>
                      
                    </Grid>
                    <Grid xs = {6} item={true}>
                        </Grid>
                     <Grid xs = {6} item={true}>
                         <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>น้ำหนักทั้งหมด</Typography>
                                </Grid>   
                                <Grid item={true}>   
                                    <BootstrapInput name="weight" value={inv.weight} placeholder='1000' size='small'  onChange = {onChange}></BootstrapInput>
                                     {/* <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:8,color:COLOR.green ,padding:5,marginRight:20}}>กิโลกรัม</Typography>
                                */}
                                
                                </Grid>  
                                <Grid item={true}>   
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:22,color:COLOR.black,marginTop:3 ,padding:5,marginRight:20}}>kg.</Typography>
                               
                                </Grid>  
                        </Grid>
                    </Grid>
                   
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>mfg date</Typography>
                                </Grid>   
                                <Grid item={true}>   
                                    
                                    <BootstrapInput name="mfg_date" value={inv.mfg_date} placeholder='01/01/1990' size='small' onChange = {onChange}
                                    ></BootstrapInput>
                                         <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:16,color:COLOR.green ,padding:5,marginRight:20}}>วัน/เดือน/ปี เว้นว่างไว้ถ้าไม่มี</Typography>
                               
                                </Grid>  
                        </Grid>
                      
                    </Grid>
                    <Grid xs = {6} item={true}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid item={true}>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>exp date</Typography>
                                </Grid>   
                                <Grid item={true}>   
                                     <BootstrapInput name="exp_date"  value={inv.exp_date} placeholder='01/01/2050' size='small' onChange = {onChange} style={{borderRadius:20}}></BootstrapInput>
                                     <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:16,color:COLOR.green ,padding:5,marginRight:20}}>วัน/เดือน/ปี เว้นว่างไว้ถ้าไม่มี</Typography>
                                </Grid>  
                        </Grid>
                    </Grid>
                    <Grid xs = {12} item={true}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >       
                        <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>ภาพถ่ายสินค้า</Typography>
                            {/* <input
                                onChange={onChangeImages}
                                type="file"
                                name="images"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                /> */}
                            <UploadFileButton onDeleteFile= {(files) => { setInv({ ...inv,images: files }) }} multiple accept="image/png, image/jpeg, image/jpg"  onChange = {onChangeImages} name='images' design = {1} title='Add file/photo' />
                             
                        </Box>
                    </Grid>
                    
                     <Grid xs = {12} item={true} align="center">
                     {/* <Button  style={{ border:'1px solid black',color:'black'}}onClick={random_data}>random data</Button> */}
            
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >
                             <img
                                src={save}
                                width='45'
                                height='45'
                                loading="lazy"
                                style={{position:'absolute',zIndex:99,marginTop:39,marginLeft:-10,borderWidth:2,borderStyle:'solid',borderColor:COLOR.brown,borderRadius:25,backgroundColor:COLOR.white}}
                            />
                        <Button style={{marginTop: 40,paddingLeft:20,borderRadius:0,color:COLOR.white,fontFamily:'kanit-medium',fontStyle:'italic',width:110,fontSize:18,backgroundColor:COLOR.brown,borderRadius:20}} 
                            
                             onClick = {async()=> {

                                if(!inv.user){
                                    set_show_modal(true,2,'Please Correct','user owner unselect!')
                                }
                                else if(!inv.lot_number){
                                    set_show_modal(true,2,'Please Correct','lot number require!')
                                } 
                                // else if(!inv.product_code){
                                //     set_show_modal(true,2,'Please Correct','product code require!')
                                // }
                                else if(!inv.name){
                                    set_show_modal(true,2,'Please Correct','name require!')
                                }
                                else if(!inv.unit){
                                    set_show_modal(true,2,'Please Correct','unit require!')
                                }
                                else if(!inv.sub_unit){
                                    set_show_modal(true,2,'Please Correct','sub unit require!')
                                }
                                else if(!inv.amount){
                                    set_show_modal(true,2,'Please Correct','amount require!')
                                }                
                                else if( isNaN(+inv.weight)){
                                    set_show_modal(true,2,'Please Correct','weight require number!')
                                }      
                                else{
                                    if(inv.exp_date){
                                            inv.exp_date = moment(inv.exp_date,'DD/MM/YYYY')
                                            console.log(inv.exp_date)
                                            if(!inv.exp_date.isValid()){
                                                set_show_modal(true,2,'Please Correct','exp date need to be D/M/Y!')
                                                return false
                                            }
                                        
                                       
                                      
                                    }
                                    if(inv.mfg_date){
                                            inv.mfg_date = moment(inv.mfg_date,'DD/MM/YYYY')
                                            if(!inv.mfg_date.isValid()){
                                                set_show_modal(true,2,'Please Correct','mfg date need to be D/M/Y!')
                                                return false
                                            }
                                        
                                        
                                    }
                                    if(isNaN(+inv.amount)){
                                        set_show_modal(true,2,'Please Correct','จำนวนสินค้า โปรดใส่ข้อมูลเป็นตัวเลข')
                                        return false
                                    }
                                    console.log(inv);
                                    set_loading(true)
                                    const res = await create_inventory(inv);
                                    
                                    set_loading(false)
                                    if(res.success){
                                        set_show_modal(true,1,'Success','inventory add complete!')
                                    
                                    }
                                    else{

                                        set_show_modal(true,2,'Fail',res.msg)
                                    }
                                }
                               
                            }}>  SAVE</Button>
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
export default connect(mapStateToProps,{create_inventory,list_customer,set_show_modal,set_loading})(Screen)
