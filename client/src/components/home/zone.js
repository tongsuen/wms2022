import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {create_zone,get_zones} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';

import Pagination from '@mui/material/Pagination';
import moment from 'moment'

const Screen  = ({auth,get_zones,create_zone}) => {
    const [zones,setZones] = useState(null)

    const [name,setName] = useState(1)

    const [total,setTotal] = useState(10)
    const limit = 10;
    useEffect(async () => {

        const res = await get_zones();
        console.log(res);

        setZones(res.data)
        
   
      },[]);

    return (
        <div style={{ height: 400, width: '100%',marginBottom:50 }}>
            <h1>Zones</h1>
            <TextField id="outlined-basic" label="name" variant="outlined" onChange = {(event)=>{
                    console.log(event.target.value);
                    setName(event.target.value)
                }}     size="small"/>
                <Button variant="contained" onClick = {async ()=>{
                        const res = await create_zone({name:name})
                        console.log(res);
                        if(res.success){
                            const res = await get_zones();
                            console.log(res);
                    
                            setZones(res.data)
                        }
                }}>Save</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{borderCollapse:'collapse'}}>
                    <TableHead>
                    <TableRow>
                        <TableCell>name</TableCell>
                        <TableCell align="right">create date</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {zones && zones.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{moment(row.create_date).format('LL')}</TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_zones,create_zone})(Screen)
