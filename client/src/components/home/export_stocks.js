import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,list_invoice} from '../../actions/manager'
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

const Screen  = ({auth,get_users,list_invoice}) => {
    const [users,setUsers] = useState( [])
    const [selectUser,setSelectUser] = useState(null)
    const [stocks,setStocks] = useState(null)

    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(10)
    const limit = 10;

    useEffect(async () => {
        console.log("export outs");
        
        const res = await get_users();
        setUsers( res.data)
        const res3 = await list_invoice({limit:limit,page:page,type:2})
        if(res3.success){
            setStocks(res3.data)
            setPage(res3.data.page)
            setTotal(res3.data.total)
        }
        
      },[]);
  
    const handleChangeUser = async (event) => {
        setSelectUser(event.target.value);

        const res3 = await list_invoice({user:event.target.value,type:2})
        setStocks(res3.data)
    };

    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
            <h1>Stocks</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              
                <TextField
                    id="outlined-select-currency"
                    select
                    label="user"
                    value={selectUser}
                    onChange={handleChangeUser}
                    helperText="Please select users"
                    size="small"
                    disabled = {false}
                    >
                {users && users.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
        

            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{borderCollapse:'collapse'}}>
                    <TableHead>
                    <TableRow>
                        <TableCell>inventory name</TableCell>
                        <TableCell align="right">user</TableCell>
                        <TableCell align="right">amount</TableCell>
                        <TableCell align="right">create date</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {stocks && stocks.list.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.inventory.name}
                        </TableCell>
                        <TableCell align="right">{row.user.name}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{moment(row.create_date).format('LL')}</TableCell>


                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            var query ={limit:limit,page:value,type:2}
                            if(selectUser) query.user = selectUser
                            const res3 = await list_invoice(query)
                            setStocks(res3.data)
                            setTotal(res3.data.total)
                    }}/>
                }
                
            </Stack>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_users,list_invoice})(Screen)
