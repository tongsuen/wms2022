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
import {get_users,export_stock,get_inventory,get_stocks,save_to_history} from '../../actions/manager'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import SearchInput from '../custom/search'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Chart from '../chart/in_out'
import Chart_User from '../chart/user_in_stocks'
import Chart_Zone from '../chart/zone_in_stocks'

import * as COLOR from '../../utils/color';
import moment from 'moment'
import logo from '../../resource/images/data/dt01@1x.png';
import edit from '../../resource/images/data/dt08@1x.png';

import plus from '../../resource/images/data/dt09@2x.png';
import save from '../../resource/images/data/dt10@2x.png';
import send from '../../resource/images/data/dt11@2x.png';

const Screen  = ({auth,get_users,get_inventory,export_stock,get_stocks,save_to_history}) => {
    const [year,setYear] = useState(null)
    const [select,setSelect] = useState(2021)
    const [alignment, setAlignment] = React.useState('bar');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
      if(newAlignment == 'bar'){
        console.log(newAlignment);
        
      }
    };

    useEffect(async () => {

        
      },[]);
  
   

    return (
        <div style={{  width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>Warehouse History</Typography>

            <Grid container style={{padding:5,backgroundColor:COLOR.soft,marginTop:20,borderWidth:2,borderStyle:'solid',borderColor:'black',borderBottomWidth:0}}>
                
       
                                <SearchInput placeholder="search for year" onClick={(e,text)=>{
                                    setYear(text)
                                }} />
                         
                        
                </Grid>
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,borderWidth:2,borderStyle:'solid',borderColor:'black'}}>
          

                <Grid container style={{padding:10}}>

                        <Grid xs = {12} style={{padding:20,marginBottom:40}}>
                          <Box style={{maxWidth:500,margin:"auto"}}> 

                             <Chart_Zone  year={year}/> 
                          </Box>
                    
                        </Grid>

                  

                        <Grid xs = {12} style={{marginBottom:40}}>
                           <Chart type_chart={'bar'} year={year}/> 
                    
                        </Grid>
                </Grid>
            </Box>
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{})(Screen)
