import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {update_stock,update_inventory,get_zones_for_choose,get_stock,list_customer,set_show_modal} from '../../../actions/manager'

import Typography from '@mui/material/Typography';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BootstrapInput from '../../../components/custom/textfield'
import UploadFileButton from '../../../components/custom/multi_upload'
import InputLabel from '@mui/material/InputLabel';

import * as COLOR from '../../../utils/color';
import moment from 'moment'

import save from '../../../resource/images/staff/head/31.png';
const Screen  = ({auth,update_inventory,get_zones_for_choose,get_stock,list_customer,set_show_modal,update_stock}) => {
    const [stock,setStock] = useState(null)
    const [inv,setInv] = useState(null)
    const [images,setImages] = useState(null)
    const [newImages,setNewImages] = useState([])

    const [customers,setCustomers] = useState([])
    const [loading,setLoading] = useState(false)
    const [zones,setZones] = useState([])
    let { stock_id } = useParams();
    useEffect(async () => {

        const zones = await get_zones_for_choose()
        console.log(zones);
        if(zones.success){
            setZones(zones.data)
        }
       
        const res2 = await list_customer()
        if(res2.success){
            setCustomers(res2.data)
            var res = await get_stock({stock_id:stock_id})
            if(res.success) {
                setStock(res.data)
                setInv(res.data.inventory)
                
                setImages(res.data.inventory.images)
            }
        }
      },[]);
    const onChangeImages = files => {
        setNewImages(files) 
    };
    const onChange = e => {
        console.log(e.target.value)
        setInv({ ...inv,[e.target.name]:e.target.value})
    };
    const onChangeStock = e => {
        console.log(e.target.value)
        setStock({ ...stock,[e.target.name]:e.target.value})
    };
    const handleChangeCustomer = (e) => {
        setInv({ ...inv,user:e.target.value})
      };
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>เเก้ไข</Typography>
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
             
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid',minWidth:1358}}>
               {stock && 
               <Grid container style={{backgroundColor:COLOR.white,padding:10,paddingLeft:"10%",paddingRight:'10%',width:"auto",paddingTop:50}} >
                  
                    <Grid xs = {12}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                            <Grid>
                                <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:16 ,padding:5,marginRight:20}}>จำนวนสินค้าที่อยู่ในคลังตอนนี้</Typography>
                            </Grid>   
                            <Grid>
                                <BootstrapInput name="current_amount" placeholder='' size='small' value={stock.current_amount}   onChange = {onChangeStock}></BootstrapInput> 
                            </Grid>  
                        </Grid>
                    </Grid>
                    <Grid xs={3} style={{padding:5}}>
                    <FormControl fullWidth>
                         <InputLabel id="demo-simple-select-label">zone</InputLabel>
                        <Select
                            size="small"
                            value={stock.zone}
                            onChange={async(e)=>{
                                setStock({...stock,zone:e.target.value})
                            }}
                            style={{fontFamily:'kanit-regular',fontSize:16,maxWidth:200 ,padding:5}}
                            >
                            {zones && zones.map(z =>{
                                return <MenuItem key={z._id} value={z._id}>{z.name}</MenuItem>
                            })}
                        
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={3} style={{padding:5}}>
                    <FormControl fullWidth>
                        <Select
                        size="small"
                        value={inv && inv.user}
                        onChange={handleChangeCustomer}
                        style={{fontFamily:'kanit-regular',fontSize:16,maxWidth:200 ,padding:5}}
                        >
                        {customers && customers.map(customer =>{
                            return <MenuItem key={customer._id} value={customer._id}>{customer.name}</MenuItem>
                        })}
                        
                        </Select>
                    </FormControl>
                    </Grid>
                    </Grid>
                    
                }

               {(inv) &&
                <Grid container style={{backgroundColor:COLOR.white,padding:20,paddingLeft:"10%",paddingRight:'10%',minWidth:800}} >
                   
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                            <Grid>
                                <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>Lot number</Typography>
                            </Grid>   
                            <Grid>
                                <BootstrapInput name="lot_number" placeholder='' size='small' value={inv.lot_number}   onChange = {onChange}></BootstrapInput> 
                            </Grid>  
                        </Grid>
                    </Grid>
                 
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>รหัสสินค้า</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput  name="product_code" placeholder='' size='small'value={inv.product_code}    onChange = {onChange}></BootstrapInput>
                                </Grid>  
                        </Grid>
                       
                    </Grid>
                    <Grid xs = {6}>
                         <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>ชื่อสินค้า</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput name="name" placeholder='' size='small' value={inv.name}    onChange = {onChange}></BootstrapInput>  
                                </Grid>  
                        </Grid>
            
                    </Grid>
                    <Grid xs = {6}>
                        </Grid>
                    <Grid xs = {6}>

                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>หน่วยสินค้า (หลัก)</Typography>
                                </Grid>   
                                <Grid>
                                    <BootstrapInput name="unit" placeholder='' size='small' value={inv.unit}    onChange = {onChange}></BootstrapInput> 
                                </Grid>  
                        </Grid>

                    </Grid>
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>หน่วยสินค้า (ย่อย)</Typography>
                                </Grid>   
                                <Grid>   
                                     <BootstrapInput name="sub_unit" placeholder='' size='small' value={inv.sub_unit}    onChange = {onChange}></BootstrapInput> 
                                </Grid>  
                        </Grid>
                    </Grid>
                 
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>จำนวน (ย่อย)</Typography>
                                </Grid>   
                                <Grid>   
                                     <BootstrapInput name="amount" placeholder='' size='small' value={inv.amount}    style={{paddingBottom:5,width:"80%"}} onChange = {onChange}></BootstrapInput>
                                </Grid>  
                        </Grid>
                      
                    </Grid>
                     <Grid xs = {6}>
                         <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>น้ำหนักทั้งหมด</Typography>
                                </Grid>   
                                <Grid>   
                                    <BootstrapInput name="weight" placeholder='kg.' size='small' value={inv.weight}     onChange = {onChange}></BootstrapInput>
                                </Grid>  
                        </Grid>
                    </Grid>
                   
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-medium',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>mfg date</Typography>
                                </Grid>   
                                <Grid>   
                                    
                                    <BootstrapInput name="mfg_date" placeholder='' size='small' value={inv.mfg_date } onChange = {onChange}></BootstrapInput>
                                </Grid>  
                        </Grid>
                      
                    </Grid>
                    <Grid xs = {6}>
                        <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                <Grid>
                                    <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>exp date</Typography>
                                </Grid>   
                                <Grid>   
                                     <BootstrapInput name="exp_date" placeholder='' size='small' value={inv.exp_date}  onChange = {onChange} style={{borderRadius:20}}></BootstrapInput>
                                </Grid>  
                        </Grid>
                    </Grid>
                    <Grid xs = {12}>
                        <Box style={{padding:10,backgroundColor:COLOR.white,marginTop:0}} >       
                        <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:16 ,padding:5,marginRight:20}}>ภาพถ่ายสินค้า</Typography>
                                {/* <input
                                onChange={onChangeImages}
                                type="file"
                                name="images"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                /> */}
                            <UploadFileButton onDeleteFile= {(files) => { setNewImages(files) }}  multiple accept="image/png, image/jpeg, image/jpg"  onChange = {onChangeImages} name='images' design = {1} title='Change Image' />
                            <Box style={{marginTop:20}}>

                            </Box>
                            <Grid container>
                                {images && images.map((img)=>{
                                    return   <Grid key={img} style={{position:"relative"}}>
                                                <img width={200} height={200} src={img} style={{objectFit:'contain'}} />
                                                <Button 
                                                onClick={()=>{
                                                    setImages(images.filter(image=> img !== image))
                                                }}
                                                style={{backgroundColor:COLOR.red,color:COLOR.white,position:'absolute',top:0,left:0}}>delete</Button>
                                             </Grid>   
                                })}
                            </Grid>
                                
                        </Box>
                    </Grid>
                    
                    
                        {loading == false && <Grid xs = {12} align="center">
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
                               setLoading(true)
                               var res = await update_inventory(inv,images,newImages); 
                               console.log(res);                           
                               if(res.success){
                                   setInv(res.data)
                                   setImages(res.data.images)
                                   const res_stock = await update_stock({stock_id:stock._id,current_amount:stock.current_amount,zone:stock.zone})
                                                     
                                   if(res_stock.success){
                                       set_show_modal(true,1,'Update!','success edit')
                                   }
                                   else{
                                       set_show_modal(true,2,'Fail!',res_stock.msg)
                                   }
                                   
                               }
                               else{

                                   set_show_modal(true,2,'Fail!',res.msg)
                               }
                               setLoading(false)
                           }}>  SAVE</Button>
                           </Box></Grid>}
                           {loading == true && <Grid xs = {12} align="center">
                               <Typography>LOADING ...</Typography>
                           </Grid>}
                        
                    
                </Grid>         
                     }   
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stock,list_customer,update_inventory,set_show_modal,get_zones_for_choose,update_stock})(Screen)
