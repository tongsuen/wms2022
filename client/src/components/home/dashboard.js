import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_users,get_category,get_inventory,create_category,create_inventory} from '../../actions/manager'
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

const Landing  = ({auth,get_users,get_category,get_inventory,create_inventory,create_category,history}) => {
    const [category,setCategory] = useState( [])
    const [selectCategory,setSelectCategory] = useState(null)
    const [users,setUsers] = useState( [])
    const [selectUser,setSelectUser] = useState(null)

    const [categoryName,setCategoryName] = useState('')
    const [inventoryName,setInventoryName] = useState('')
    const [amount,setAmount] = useState(0)

    const [inventory,setInventory] = useState(null)
    const [page,setPage] = useState(1)

    const [total,setTotal] = useState(10)
    const limit = 10;

    useEffect(async () => {
        try {
            const res = await get_users();
            console.log(res);
            if(res.success){
                setUsers( res.data)
                setSelectUser(res.data[0]._id)
                const res2 = await get_category({user:res.data[0]._id})
                setCategory(res2.data)
                if(res2.data){
                    setSelectCategory(res2.data[0]._id)
        
                    const res3 = await get_inventory({user:res.data[0]._id})
                    setPage(res3.data.page)
                    setTotal(res3.data.total)
                    setInventory(res3.data)
                }
                    
            }
        }catch(err){
            console.log(err);
            
        }
      
    
        
      },[]);
    const handleChange = (event) => {
        setSelectCategory(event.target.value);
    };
    const handleChangeUser = async (event) => {
        setSelectUser(event.target.value);
        const res = await get_category({user:event.target.value})
        if(res.success){
            setCategory(res.data)
            if(res.data.length > 0)
                setSelectCategory(res.data[0]._id)
        }
        const res3 = await get_inventory({user:event.target.value})
        setInventory(res3.data)
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>Dashboard</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              
               {selectUser && <TextField
                    id="outlined-select-currency"
                    select
                    label="user"
                    value={selectUser}
                    onChange={handleChangeUser}
                    helperText="Please select users"
                    size="small"
                    disabled = {false}
                    >
                {users.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>} 
                {selectCategory && 
                 <TextField
                    id="outlined-select-currency"
                    select
                    label="cateogory"
                    value={selectCategory}
                    onChange={handleChange}
                    helperText="Please select your category"
                    size="small"

                    >
                {category.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>
                }
               <br/>

                 <h3>New Category</h3>
                <TextField id="outlined-basic" label="name" variant="outlined" onChange = {(event)=>{
                    console.log(event.target.value);
                    setCategoryName(event.target.value)
                }}     size="small"/>
                <Button variant="contained" onClick = {async ()=>{
                        const res = await create_category({user:selectUser,name:categoryName})
                        console.log(res);
                        if(res.success){
                            setCategory([...category,res.data])
                        }
                }}>Save</Button>
                <h3 className='color-red'>New Inventory</h3>
                <TextField id="outlined-basic" label="name" variant="outlined"  onChange = {(event)=>{
                    console.log(event.target.value);
                    setInventoryName(event.target.value)
                }}     size="small"/>
                <TextField id="outlined-basic" label="amount" variant="outlined"   onChange = {(event)=>{
                    console.log(event.target.value);
                    setAmount(event.target.value)
                }}    size="small"/>
                <Button variant="contained" onClick = {async ()=>{
                        const res = await create_inventory({user:selectUser,name:inventoryName,amount:amount,category:selectCategory})
                        console.log(res);
                        if(res.success){
                            const res3 = await get_inventory({user:selectUser})
                            setInventory(res3.data)
                        }
                }}>Save</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>inventory name</TableCell>

                        <TableCell align="right">in stocks</TableCell>
                        <TableCell align="right">category</TableCell>
                        <TableCell align="right">amount</TableCell>
                        <TableCell align="right">create date</TableCell>
                        <TableCell align="right">QRCODE</TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {inventory && inventory.list.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>

                        <TableCell align="right">{row.is_in_stock? 'in stock' : 'waiting'}</TableCell>
                        <TableCell align="right">{row.category.name}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{moment(row.create_date).format('LL')}</TableCell>
                        <TableCell align="right"><Button onClick = {()=>{
                            history.push('qr_code/'+row._id)
                        }}>generate</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2}>
                {total/limit > 1 &&
                    <Pagination count={Math.ceil(total/limit)} page={page} size="small" onChange = {async (event, value)=>{
                            setPage(value);
                            var query ={limit:limit,page:value}
                            if(selectUser) query.user = selectUser
                            const res3 = await get_inventory(query)
                            setPage(res3.data.page)
                            setTotal(res3.data.total)
                            setInventory(res3.data)
                    }}/>
                }
                
            </Stack>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_users,get_category,get_inventory,create_inventory,create_category})(Landing)
