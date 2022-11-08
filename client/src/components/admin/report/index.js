
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {report_data} from '../../../actions/manager'
import {list_inventory} from '../../../actions/search'
import Typography from '@mui/material/Typography';

import {CustomMultiSelect,StyledOption} from '../../../components/custom/select_option';


import DowloadPdf from '../../../components/pdf/download'
import DownloadPdfWarehouse from '../../../components/pdf/download_warehouse'
import DownloadPdfInventory from '../../../components/pdf/download_inventory'

import * as COLOR from '../../../utils/color';

import print from '../../../resource/images/data/32.png';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Screen  = ({auth,report_data,list_inventory}) => {

    const [data, setData] = useState({
        start_date:new Date(),
        end_date:new Date(),
        type:1,
        is_customer:false,
    });
    const [list,setList] = useState([])
    const [select,setSelect] = useState([])
    const handleChange = async (e) => {
        setData({...data,[e.target.name]:e.target.value})
        console.log(e.target.value);
       
    };
    const handleChangeStart = (e) => {
        console.log(e)
        setData({...data,start_date:e})
        
    };
    const handleChangeEnd = (e) => {
        setData({...data,end_date:e})
        
    }
    const handleChangeSelect = (e) => {
        setSelect(e.target.value)
        setData({...data,lot_number:e.target.value})
    };
    const history = useHistory();
    useEffect(async () => {
        
        const res = await list_inventory({admin:true})
      
        if(res.success){
            console.log(res.data)
            setList(res.data)
            
        }

      },[]);
  
    const style_1 ={backgroundColor:COLOR.white,border:'1px solid black',height:45,width:200}
    const style_2 ={backgroundColor:COLOR.peach,border:'1px solid black',height:45,width:200}
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:900 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>รายงาน</Typography>
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.soft,minHeight:60,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}}>
                    
                  
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,borderWidth:2,borderStyle:'solid',minHeight:500,padding:40,justifyContent:"center"}} >
           
                
           
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                <Grid container style={{backgroundColor:COLOR.white,padding:20,marginTop:20}} align="center">
                    <Grid item={true} xs={4} style={{paddingLeft:60}}>

                        <Grid container align='center' style={data.type == 1 ? style_2:style_1}
                         onClick={()=>{
                                    setData({...data,type:1})
                        } }>
                            <Grid >
                                <Box style={{height:30,width:30,backgroundColor:COLOR.brown,borderRadius:25,marginLeft:10,marginTop:5}}>

                                    <Typography style={{fontFamily:'kanit-regular',fontSize:20 ,padding:0,color:COLOR.white}}>1.</Typography>
                                </Box>
                            </Grid>
                            <Grid >
                               
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:5,color:COLOR.black,marginLeft:5}}>รายละเอียดสินค้า</Typography>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={4}>
                         <Grid container align='center' style={data.type == 2 ? style_2:style_1}
                         onClick={()=>{
                                    setData({...data,type:2})
                        } }>
                            <Grid >
                                <Box style={{height:30,width:30,backgroundColor:COLOR.brown,borderRadius:25,marginLeft:10,marginTop:5}}>

                                    <Typography style={{fontFamily:'kanit-regular',fontSize:20 ,padding:0,color:COLOR.white}}>2.</Typography>
                                </Box>
                            </Grid>
                            <Grid >
                               
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:5,color:COLOR.black,marginLeft:5}}>สินค้าคงคลัง</Typography>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item={true} xs={4} style={{paddingRight:60}}>
                         <Grid container align='center' style={data.type == 3 ? style_2:style_1}
                         onClick={()=>{
                                    setData({...data,type:3})
                        } }>
                            <Grid >
                                <Box style={{height:30,width:30,backgroundColor:COLOR.brown,borderRadius:25,marginLeft:10,marginTop:5}}>

                                    <Typography style={{fontFamily:'kanit-regular',fontSize:20 ,padding:0,color:COLOR.white}}>3.</Typography>
                                </Box>
                            </Grid>
                            <Grid >
                               
                                <Typography style={{fontFamily:'kanit-medium',fontSize:20 ,padding:5,color:COLOR.black,marginLeft:5}}>สินค้าเข้า-ออก</Typography>
                                
                            </Grid>
                            </Grid>
                    </Grid>
                <Grid item={true} xs={12} style={{marginTop:40}}></Grid>

                   <Grid item={true} xs= {6} style={{paddingRight:20}}>
                       <Grid container >
                           <Grid item={true} xs={12} align='right' style={{paddingBottom:40}}>
                                <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0,alignItems:'center',justifyContent:"right"}} >   
                                        <Grid>
                                            <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>เริ่มจากวันที่</Typography>
                                        </Grid>   
                                        <Grid>   
                                            <DatePicker
                                                    name="start_date"
                                                    label="เริ่มจากวันที่"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={data.start_date}
                                                    onChange={handleChangeStart}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center',backgroundColor:COLOR.soft_green,width:200,height:45,borderRadius:20 }}>
                                                        <input ref={inputRef} {...inputProps} style={{backgroundColor:COLOR.soft_green,borderRadius:20 ,borderWidth:0,fontFamily:'kanit-regular',fontSize:16,width:140,textAlign:'center'}} />
                                                        {InputProps?.endAdornment}
                                                        </Box>
                                                    )}
                                                
                                                />
                                        </Grid>  
                                </Grid>
                             
                           </Grid>
                            
                             <Grid item={true} xs={12} >
                                <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0,alignItems:'center',justifyContent:"right"}} >   
                                        <Grid>
                                            <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>รหัสสินค้า</Typography>
                                        </Grid>   
                                        <Grid>   
                                            <CustomMultiSelect onChange={e=> setData({...data,product_code:e})} >
                                                     
                                                     {list.map(inv =>{
                                                          if(inv.product_code)
                                                             return <StyledOption key={inv._id} value={inv.product_code}>{inv.product_code}</StyledOption>
                                                     })}
                                                    
                                                    
                                            </CustomMultiSelect>
                                            {/* <BootstrapInput name="product_code" placeholder='รหัสสินค้า' size='small' onChange = {handleChange}></BootstrapInput>  */}
                                        </Grid>  
                                </Grid>
                             </Grid>

                            <Grid item={true} xs={12} style={{marginTop:0}}> 
                                    <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0,alignItems:'center',justifyContent:"right"}} >   
                                            <Grid>
                                                <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20}}>ชื่อสินค้า</Typography>
                                            </Grid>   
                                            <Grid>
                                                 <CustomMultiSelect onChange={e=> setData({...data,product_name:e})} >
                                                     
                                                     {list.map(inv =>{
                                                         if(inv.name)
                                                            return <StyledOption key={inv._id} value={inv.name}>{inv.name}</StyledOption>
                                                     })}
                                                    
                                                    
                                                  </CustomMultiSelect>
                                               {/* <BootstrapInput name="product_name" placeholder='ชื่อ' size='small' onChange = {handleChange}></BootstrapInput>  */}
                                            </Grid>  
                                    </Grid>
                                    
                                        
                            </Grid>

                       </Grid>
                        
                   </Grid>
                  
                   <Grid item={true} xs= {6} style={{paddingLeft:0}}>
                        <Grid item={true} xs={12} style={{paddingBottom:40}} align='right'> 
                                <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0,alignItems:'center'}} >   
                                        <Grid>
                                            <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20,width:140}}>สิ้นสุดวันที่</Typography>
                                        </Grid>   
                                        <Grid>   
                                            <DatePicker
                                                    name="start_date"
                                                    label="สิ้นสุดวันที่"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={data.end_date}
                                                    onChange={handleChangeEnd}
                                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                                        <Box sx={{ display: 'flex', alignItems: 'center',backgroundColor:COLOR.soft_green,width:200,height:45,borderRadius:20 }}>
                                                        <input ref={inputRef} {...inputProps} style={{backgroundColor:COLOR.soft_green,borderRadius:20 ,borderWidth:0,fontFamily:'kanit-regular',fontSize:16,width:140,textAlign:'center'}} />
                                                        {InputProps?.endAdornment}
                                                        </Box>
                                                    )}
                                                
                                                />
                                        </Grid>  
                                </Grid>
                        </Grid>
                        <Grid item={true} xs={12} style={{marginTop:0}}> 
                                <Grid container style={{padding:10,backgroundColor:COLOR.white,margin:0}} >   
                                        <Grid xs={4}>
                                            <Typography style={{fontFamily:'kanit-regular',fontStyle:'italic',fontSize:20 ,padding:5,marginRight:20,width:140}}>Lot Number</Typography>
                                        </Grid>   
                                        <Grid xs={8} style={{textAlign:"left"}}>   
                                                <CustomMultiSelect onChange={e=> setData({...data,lot_number:e})} >
                                                     
                                                    {list.map(inv =>{
                                                        return <StyledOption key={inv._id} value={inv.lot_number}>{inv.lot_number}</StyledOption>
                                                    })}
                                                   
                                                   
                                                </CustomMultiSelect>
                                            
                                                {/* <BootstrapInput name="lot_number" placeholder='รหัสลอต' size='small' onChange = {handleChange} value={data.lot_number}></BootstrapInput> 
                                                     */}
                                                
                                            
                                            
                                        </Grid>  
                        </Grid>
                                    
                        </Grid>
                   </Grid>
                   
                   <Grid item={true} xs={12} style={{height:40}}></Grid>

                   <Grid item={true} xs={6} style={{marginTop:0}} align="center"> 
                       
                           
                            
                   </Grid>
                  
                
                   
                   <Grid item={true} xs={12}>    
                            <img
                                src={print}
                                width='45'
                                height='45'
                                loading="lazy"
                                style={{position:'absolute',zIndex:99,marginTop:20,marginLeft:-10,borderWidth:2,borderStyle:'solid',borderColor:COLOR.brown,borderRadius:25,backgroundColor:COLOR.white}}
                            />
                    <Button variant="outlined"
                                style={{fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.brown,color:COLOR.white,borderRadius:30,marginTop:20,height:45,padding:20,paddingLeft:40}}
                                onClick = {async ()=>{
                                    
                                    const res = await report_data(data)
                                    console.log(res);
                                    if(res.success){
                                        if(data.type == 1){
                                            await DownloadPdfInventory({list:res.data,search:data})
                                        }
                                        else if(data.type == 2){
                                            await DownloadPdfWarehouse({list:res.data,search:data})
                                        }
                                        else{

                                            await DowloadPdf({list:res.data,search:data})
                                        }
                                    }
                                }}>
                            PRINT
                        </Button>
                   </Grid>
                 
                </Grid>
                
                </LocalizationProvider>
           </Box>

        </div>
    )
}
const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{report_data,list_inventory})(Screen)
