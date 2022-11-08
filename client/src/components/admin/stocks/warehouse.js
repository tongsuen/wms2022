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
import {create_stock,inventory_waiting,get_zones,create_zone,save_to_history,zone_with_stock,set_loading} from '../../../actions/manager'
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'

import BootstrapInput from '../../../components/custom/textfield'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as COLOR from '../../../utils/color';
import moment from 'moment'
import CardStock from '../../../components/custom/card_stock';

import Paper from '@mui/material/Paper';


const Screen  = ({auth,create_stock,inventory_waiting,get_zones,create_zone,set_loading,zone_with_stock}) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [zone, setZone] = useState({});

    const [list, setList] = useState(null);
    const [selectInventory, setSelectInventory] = useState({id:null,amount:0});
    const [selectZone, setSelectZone] = useState(null);
    
    
    const [row, setRow] = useState([]);

    const [zones, setZones] = useState([]);
    const [zonesFill, setZonesFill] = useState({});
    var temp = 0
    const handleClickOpen = async (zone) => {
        setSelectZone(zone)
       // setOpen(true);
        const res = await inventory_waiting()
        if(res.success){
            console.log(res)
            setList(res.data)
        }
    };
    const clickOpenSave = async (zone) => {
     
       setOpen(true);
        
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectZone(null)
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleChange = (e) =>{
        setZone({...zone,[e.target.name]:e.target.value})
    }
    const getStockofZone = async (z) =>{
        const res = await zone_with_stock({zone_id:zone._id})
        if(res.success){
            if(res.data.length > 0){
                console.log(zone)
                setZonesFill({...zonesFill,[zone._id]:'filled'})
                return <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>filled</Typography>
            }
            else{

                setZonesFill({...zonesFill,[zone._id]:'empty'})
                return <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>empty</Typography>
            }
        }
        return  <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>empty</Typography>
    }
    const getListofZone = async () =>{
        const res = await get_zones()
        if(res.success){
          var origin = 1;
          setZones(res.data)
          var old = 0
          var array = []
          var line_of_row = []
          for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index];
              if(selectZone){
                  if(selectZone._id == element._id){
                      setSelectZone(element)
                  }
              }
              if(old == element.x){
                  array.push(element)
              }
              else {
                  const new_array = array.slice();
                  console.log(new_array)
                  line_of_row.push(new_array)
                  
                  array = []
                  array.push(element)
                  
              }
              old = element.x
          }
          if(array && row){

                const new_array = array.slice();   
                
                line_of_row.push(new_array)    
                console.log(line_of_row)
          }
          setRow(line_of_row)

        }
    }
    useEffect(async () => {
        getListofZone();
        // const result = zones.map(async(zone)=>{
        //     const res = await zone_with_stock({zone_id:zone._id})
        //     if(res.success){
        //         if(res.data.length > 0){
        //             console.log(zone)
        //             setZonesFill({...zonesFill,[zone._id]:'filled'})
        //         }
        //         else{

        //             setZonesFill({...zonesFill,[zone._id]:'empty'})
        //         }
        //     }
        // })
        // await Promise.all(result)
    },[]);
 
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:1000}}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>WAREHOUSE SYSTEM</Typography>
            {/* 
            <Button style={{backgroundColor:COLOR.brown,color:COLOR.white}} onClick={async ()=>{
                const res = await save_to_history();
                if(res.success){
                    alert('save success')
                }
            }} >save history </Button> */}

            {/* <Button onClick ={async ()=>{
             
                  getListofZone ()
                 
            }}>list</Button> */}

        <Fab style={{backgroundColor:COLOR.soft_green,color:COLOR.dark_green}} aria-label="add">
        <AddIcon onClick={clickOpenSave}/>
        </Fab>
            <Grid container style={{marginTop:60}}>
  
                    {row.map(r =>{
                        return (

                            <Grid key={r._id} container justifyContent= 'left' alignItems='center'>
                                  {r.map( (z) =>{
                                            return <Grid key={z._id} item={true}  style={{margin:5}} >
                                                        {z.stocks.length > 0 ? 
                                                                <Box style={selectZone && (selectZone._id == z._id) ? {border:'1px solid black',width:50,height:50,backgroundColor:COLOR.mint,color:COLOR.green} :  {border:'1px solid black',width:50,height:50,backgroundColor:COLOR.green,color:COLOR.white} }
                                                                    onClick = {()=> handleClickOpen(z)} > 
                                                                    <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12}}>{z.name}</Typography>
                                                                    <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12}}>{'filled'}</Typography>
                                                                </Box>:
                                                                <Box style={selectZone && (selectZone._id == z._id) ?{border:'1px solid black',width:50,height:50,backgroundColor:COLOR.mint} : {border:'1px solid black',width:50,height:50}}
                                                                    onClick = {()=> handleClickOpen(z)} > 
                                                                    <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.green}}>{z.name}</Typography>
                                                                    <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}> {'empty'}</Typography>
                                                                </Box>}
                                                    
                                                    </Grid> 
                                        })}       
                            </Grid>
                
                        )
                    })}
                  
               
                 
            </Grid>
            {selectZone &&
            
                <Grid container style={{padding:20,borderRadius:10,marginTop:20}}>
                    <Grid xs={12}>
                        <Grid container style={{padding:10}}>
                        {(list && list.length>0) ? 
                            <Paper elevation={2}>

                                <Grid container style={{padding:20,position:"relative"}}>
                                    <Typography style={{fontFamily:"kanit-medium",position:"absolute",top:-10,backgroundColor:COLOR.white,color:COLOR.dark_green}}>Add Product to Zone.</Typography>
                                  
                                    <Grid xs={12} style={{marginTop:10}}>
                                        <Typography style={{fontFamily:"kanit-regular",fontSize:22}}>ZONE: {selectZone.name}</Typography>
                                    </Grid>
                                
                                    <Grid xs={12} stle={{padding:10}}>
                                    <Select
                                            labelId="inventory_id"
                                            id="inventory_id"
                                            value={selectInventory.id}
                                            label="inventory."
                                            onChange = {(e)=>{
                                                console.log(e.target.value)
                                                const inventory =  list.filter( inv => {return (inv._id == e.target.value)})
                                                console.log(inventory[0])
                                                setSelectInventory({id:e.target.value,amount:inventory[0].current_amount})
                                            }}
                                            style={{minWidth:200,marginTop:10}}
                                            size="small"
                                        >
                                            {list && list.map(inv =>{

                                                return <MenuItem value={inv._id}>name: {inv.name} lot number: {inv.lot_number} code: {inv.product_code}</MenuItem>
                                                
                                            })}
                                    </Select>
                           
                                    </Grid>

                                    <Grid xs={12} style={{padding:10,paddingLeft:0}}>
                       
                                        <BootstrapInput type='text' name="amount" value={selectInventory.amount} onChange={(e) =>{

                                                    setSelectInventory({...selectInventory,amount:e.target.value})
                                            }} />
                                    </Grid>
                                    <Grid xs={12}>
                          
                                        <Button onClick ={async()=>{
                                            
                                                if(selectInventory.id){
                                                    set_loading(true)
                                                    const res = await create_stock({inventory:selectInventory.id,zone:selectZone,amount:selectInventory.amount})
                                                    if(res.success){       
                                                        const rin = await inventory_waiting()
                                                        if(rin.success){
                                                            setSelectInventory({id:null,amount:0})
                                                            setList(rin.data)
                                                            getListofZone()
                                                        }
                                                    }
                                                    set_loading(false)
                                                }
                                        }} size='small' style={{marginTop:10,backgroundColor:COLOR.soft_brown,fontFamily:'kanit-regular',border:'1px solid',borderColor:COLOR.white,color:COLOR.white}}>SAVE</Button>
                                        
                                    </Grid>
                               </Grid>
                            </Paper>
:    <Typography style={{fontFamily:"kanit-regular"}}>Please insert inventory</Typography>
}
                            <Grid xs={12}>
                            </Grid>
                            <Grid xs={12}>

                            
                            
                            <br/>
                            
                            </Grid>
                        </Grid>
                    </Grid>
                    {selectZone.stocks.map(stock =>{
                        return <Grid key={stock._id} xs={4} style={{padding:10}}>
                                    <CardStock stock={stock} zone_list={zones}
                                    onChange = {result =>{
                                        if(result){
                                            getListofZone()
                                        }
                                    }}
                                    onRemove = {(result)=>{
                                            if(result){
                                                getListofZone()
                                            
                                            }
                                    }}/>
                                </Grid>
                    })}
                 </Grid>
            }

          
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                
                    <Typography style={{fontFamily:'kanit-regular',fontSize:20,color:COLOR.black}}>ADD ZONE: </Typography>
                </DialogTitle>
                <DialogContent>
                    
                    <Grid container style={{marginTop:20,padding:20}}>
                        <Grid xs={12} style={{marginBottom:10}}>

                            <BootstrapInput type='text' name="name" placeholder='name A,B,C...' onChange={handleChange} />
                        </Grid>
                        <Grid xs={6}>
                            
                            <BootstrapInput type='text' name="x" placeholder='ตำเเหน่ง เเนว นอน'  onChange={handleChange} />
                        </Grid>
                        <Grid xs={6}>
                            <BootstrapInput type='text' name = "y" placeholder='ตำเเหน่ง เเนว ตั่ง' onChange={handleChange} />
                        </Grid>
                        <Grid xs={12} style={{marginTop:10}}>
                            
                            <Button style={{backgroundColor:COLOR.dark_green,color:COLOR.white}} onClick ={async ()=>{
                                
                                    set_loading(true)
                                    const res = await create_zone(zone)
                                    if(res.success){

                                         getListofZone ()
                                    }
                                    set_loading(false)
                                
                                
                            }}>save</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} style={{fontFamily:'kanit-regular',}}>close</Button>
                {/* <Button onClick={handleClose} autoFocus>
                    Agree
                </Button> */}
                </DialogActions>
            </Dialog>
            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">     
                    <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}>Product CODE: 0A9FF3993234</Typography>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}>Product LOT: 093993234</Typography>
                  <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}>Product Name: FISH OIL FROM CANADA</Typography>
                  <Typography style={{fontFamily:'kanit-regular',fontSize:16,color:COLOR.black}}>Product Amout: 200 ETC.</Typography>
                   
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose2}  style={{fontFamily:'kanit-regular',}}>close</Button>
                {/* <Button onClick={handleClose} autoFocus>
                    Agree
                </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{create_stock,inventory_waiting,save_to_history,create_zone,get_zones,zone_with_stock,set_loading})(Screen)
