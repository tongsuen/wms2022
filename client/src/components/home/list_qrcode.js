import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {search_inventory} from '../../actions/search'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';

import QRCode from 'qrcode.react'

import moment from 'moment'

const Screen  = ({match,search_inventory}) => {
    const [data,setData] = useState(null)
    const [numbers,setNumbers] = useState([1,2,3,4,5,6,7])
    useEffect(async () => {

        console.log(match.params.id);
        const res = await search_inventory({id:match.params.id})
        if(res.success){
            setData(res.data)
            const elem = [];
            for (let index = 0; index < res.data.amount; index++) {
                elem.push(<Grid item item={true} xs={3} key={index}>
                    <div style={{padding:10}}>
                        <QRCode value={'www.tongsuenlogistics.co.th/get_data?are340032kfa302'} />  
                        <div>{res.data.name}</div>
                    </div>
                </Grid>)
                
            }//JSON.stringify(data)
            setNumbers(elem)
        }
    },[]);
   
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            
                {data && <>
                    {numbers.map((item,index)=>{
                        return item
                    })}
              
                </>}
                
          
            </Grid>
        </Box>
    
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{search_inventory})(Screen)
