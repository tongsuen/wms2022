import React,  {useRef,useState,useEffect}  from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stock,create_note} from '../../actions/manager'
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
import {useReactToPrint} from 'react-to-print';
import UploadFileButton from '../custom/multi_upload'

import * as COLOR from '../../utils/color';
import * as BASE from '../../utils/const';
import moment from 'moment'
import edit from '../../resource/images/staff/customer/12.png';
import print from '../../resource/images/data/32.png';
const Screen  = ({auth,get_stock,create_note}) => {
    const [stock,setStock] = useState(null)
    const [qrcodes,setQRCodes] = useState([])
    const [note,setNote] = useState()
    let { stock_id,amount } = useParams();
    const history = useHistory();
    const [number,setNumber] = useState(0)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(async () => {

        const res = await get_stock({stock_id:stock_id})
        if(res.success) {
            setStock(res.data)
            setNote({...note,stock_id:stock_id})
            var array = []
            for (let index = 0; index < res.data.current_amount; index++) {
                array.push(1)
            }
            setQRCodes(array)
            setNumber(res.data.current_amount)
        }
        
      },[]);
    const onChangeImages = e => {
        setNote({ ...note,images: e.target.files })
    };
    const onChangeDetail = e => {
        setNote({ ...note,detail: e.target.value })
    };
 
    if(stock == null){
        return (<div></div>)
    }
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20,minWidth:800}}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>{stock.inventory.name}</Typography>
          
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid',marginTop:20}}>
                <Grid container space={2} style={{backgroundColor:COLOR.white,padding:20,paddingLeft:100}} >
                   <Grid xs={12}><input style={{fontFamily:'kanit-medium',fontSize:18,color:COLOR.dark_green}} type='text' placeholder="จำนวน QR CODE" onChange={(e)=>{
                        setNumber(e.target.value)
                   }} /></Grid>
                   <Grid xs={10}>
                <Button style={{color:COLOR.black,fontFamily:'kanit-medium',fontStyle:'italic'}} onClick={()=>{
                     var array = []
                     for (let index = 0; index < number; index++) {
                         array.push(1)
                     }
                     setQRCodes(array)

                }}>print</Button>
                </Grid>
                <Grid xs={12} ref={componentRef}>
                    {qrcodes.map(item=>{
                        return <QRCode value={BASE.SERVER + 'stock_detail/'+stock._id} style={{padding:10}} />
                    })}
                </Grid>
                   
                </Grid>
                <Grid item={true} xs={12}>    
                        <div style={{textAlign:'center'}}>
                            <img
                                src={print}
                                width='45'
                                height='45'
                                loading="lazy"
                                style={{position:'absolute',zIndex:99,marginTop:20,marginLeft:-10,borderWidth:2,borderStyle:'solid',borderColor:COLOR.brown,borderRadius:25,backgroundColor:COLOR.white}}
                            />
                        <Button variant="outlined"
                                style={{fontFamily:'kanit-medium',fontSize:20,fontStyle:'italic',backgroundColor:COLOR.brown,color:COLOR.white,borderRadius:30,marginTop:20,height:45,padding:20,paddingLeft:40}}
                                onClick = {handlePrint}>
                            PRINT
                        </Button>
                        </div>
                </Grid>    
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stock,create_note})(Screen)
