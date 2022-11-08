import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';

import moment from 'moment'

const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [users,setUsers] = useState( [])
    const [selectUser,setSelectUser] = useState(null)
    const [stocks,setStocks] = useState(null)
    const [date,setDate] = useState(moment().format('DD-MM-YYYY'))
    useEffect(async () => {

        const res = await get_users();
        console.log(res);
        setUsers( res.data)
        const res3 = await get_stocks()
        setStocks(res3.data)
        
      },[]);
  
    const handleChangeUser = async (event) => {
        setSelectUser(event.target.value);

        const res3 = await get_stocks({user:event.target.value})
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
                        <TableCell align="right">category</TableCell>
                        <TableCell align="right">amount</TableCell>
                        <TableCell align="right">create date</TableCell>
                        <TableCell align="right">export</TableCell>
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

                        <TableCell align="right">{row.zone.name}</TableCell>
                        <TableCell align="right">{row.current_amount}</TableCell>
                        <TableCell align="right">{moment(row.create_date).format('LL')}</TableCell>

                        <TableCell align="right">
                            <form onSubmit = {async (event)=>{
                                event.preventDefault();
                                const form = event.target;
                                // get the field that you want
                                const amountField = form.elements['amount']
                                const res = await export_stock({stock_id:row._id,amount:amountField.value})
                                console.log(res);
                                const res3 = await get_stocks()
                                setStocks(res3.data)
                                amountField.value = 0;
                            }}> 
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                >
                                    <TextField id="outlined-basic" label="amount" name="amount" variant="outlined"  size="small"/>
                                    <button type='submit'>export</button>
                                </Stack>
                            </form>
                        </TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TextField id="outlined-basic" label="date" name="date" variant="outlined"  size="small" value= {date} onChange = {(event)=> setDate(event.target.value)}/>
            <Button variant="contained" onClick = {async ()=>{
               
                     const res3 = await save_to_history({date:date})
                     console.log(res3)
                        
                }}>Save</Button>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_users,get_inventory,get_stocks,export_stock,save_to_history})(Screen)
