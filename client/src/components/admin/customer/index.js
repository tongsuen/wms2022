import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect,useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {list_customer} from '../../../actions/manager'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as COLOR from '../../../utils/color';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import plus from '../../../resource/images/staff/head/21.png';

const Screen  = ({auth,list_customer}) => {
    const [customers,setCustomers] = useState( [])
    const history = useHistory();
    useEffect(async () => {
        const res = await list_customer()
        console.log(res);
        if(res.success){
            setCustomers(res.data)
        }
        
      },[]);

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Customer Information</Typography>
            <Grid container style={{padding:10,backgroundColor:COLOR.peach,minHeight:60,marginTop:20,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
                    
            </Grid>
            <Box style={{backgroundColor:COLOR.gray,minHeight:500,minWidth:800,padding:20,borderWidth:2,borderStyle:'solid'}}>
                
                
                <Grid container style={{padding:20,backgroundColor:COLOR.white,margin:0}}>
                    <Grid item={true} xs={12} style={{paddingBottom:10,paddingTop:10}} >
                        <Button
                            onClick = {()=>{ history.push('/admin_customer_register')}}
                        style={{marginLeft:20,borderRadius:0,color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic',fontSize:22,backgroundColor:COLOR.soft,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}} 
                            startIcon={ <img
                                src={plus}
                                width='30'
                                height='30'
                                loading="lazy"
                                
                            />}>
                            เพิ่มข้อมูลลูกค้า
                        </Button>
                    </Grid>
                    <Grid item={true} xs={12} style={{padding:20}} >
                            <Typography style={{fontFamily:'kanit-medium',fontSize:20,}}>- จำนวนลูกค้าทั้งหมด {customers.length} </Typography>
                    </Grid>
                    <Grid container >
                       
                        {/* <Grid xs = {3} style={{padding:20}}>
                            <ThemeProvider theme={lightTheme}>
                                <Box
                            
                                >
                                    <Item key={4} elevation={4} style={{padding:20}}>
                                    <Typography style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5}}>01</Typography>
                                    <Typography style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5,paddingBottom:10}}>Song Joong Ki</Typography>
                                    <Box style={{paddingTop:10,backgroundColor:COLOR.soft_green,width:100,height:100,borderRadius:50,border:'solid 1px black',alignItems:'center',justifyContent:'center',margin:'auto'}}>
                                    </Box>
                                    <Button style={{marginTop:10,borderRadius:0,color:COLOR.black,fontFamily:'kanit-regular',width:110,fontSize:15,backgroundColor:COLOR.soft,borderWidth:1,borderColor:COLOR.black,borderStyle:'solid'}}  
                                        onClick = {()=>  history.push('/admin_list_inbox')}>
                                        see more
                                    </Button>
                                    </Item>
                        
                                </Box>
                            </ThemeProvider>
                        </Grid> */}

                       


                        
                       {customers && customers.map((customer,index )=>{
                           return  <Grid key={customer._id} style={{marginTop:0,width:240}} align='center'>
                                        <Box style={{borderRight:'1px solid black',borderBottom:'1px solid black',padding:20,height:320}}
                                        >
                                            <Typography style={{fontFamily:'rockwell',fontSize:30,fontWeight:'bold',fontStyle:'italic',textAlign:'left',padding:5,color:COLOR.dark_green}}>{('0' + (index+1)).slice(-2)}</Typography>
                                            <Typography display="inline" style={{fontFamily:'kanit-medium',fontSize:20,textAlign:'left',padding:5,paddingBottom:10,display: 'contents'}} noWrap>{customer.name}</Typography>
                                            <div style={{height:30}}></div>
                                            {customer.avatar ?
                                                <img style={{width:100,height:100,borderRadius:50,alignItems:'center',justifyContent:'center',margin:'auto',objectFit:'cover'}} src={customer.avatar} /> 
                                                
                                                :<img style={{backgroundColor:COLOR.soft_green,width:100,height:100,borderRadius:50,border:'solid 1px black',alignItems:'center',justifyContent:'center',margin:'auto'}}>
                                                
                                                </img>
                                             }
                                             <Box style={{width:"100%",alignItems:'center',justifyContent:'center',margin:'auto',textAlign:'center',paddingTop:20}}>
                                                <Button 
                                                style={{height:24,marginTop:10,borderRadius:0,color:COLOR.white,fontFamily:'kanit-regular',fontSize:15,backgroundColor:'#f29d79',padding:10,boxShadow:'5px 5px 0px #a74d40'}}  
                                                    onClick = {()=>  history.push({pathname:'/admin_profile/'+customer.email})}>
                                                    see more
                                                </Button>
                                            </Box>
                                            
                                
                                        </Box>
                                </Grid>
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
export default connect(mapStateToProps,{list_customer})(Screen)
