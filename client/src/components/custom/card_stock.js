import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as COLOR from '../../utils/color';
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {remove_stock,change_zone_stock} from '../../actions/manager'

function MediaCard({stock,zone_list,onChange,onRemove,remove_stock,change_zone_stock}) {

  const history = useHistory()
  const handleChange = async  (event) => {
    const res = await change_zone_stock({stock_id:stock._id,zone_id:event.target.value})
      if(res.success){
        onChange(res.data)
      }
  };
  return (
    <Card sx={{ maxWidth: 345, }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography  style={{fontFamily:"kanit-regular"}} gutterBottom variant="h5" component="div">
          {stock.name}
        </Typography>
        <Typography  style={{fontFamily:"kanit-regular"}} variant="body2" color="text.secondary">
            LOT NUMBER: {stock.lot_number}
        </Typography>
        <Typography  style={{fontFamily:"kanit-regular"}} variant="body2" color="text.secondary">
            PRODUCT CODE: {stock.product_code}
        </Typography>
        <Typography   style={{fontFamily:"kanit-regular"}}variant="body2" color="text.secondary">
            AMOUNT: {stock.current_amount}
        </Typography>
        
        {stock &&
        
        <FormControl fullWidth style={{marginTop:10}}>
          <InputLabel id="demo-simple-select-label">zone</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stock.zone}
            label="Zone"
            size="small"
            onChange={handleChange}
          >
            {zone_list.map(z=>{

                  return <MenuItem key={z._id} value={z._id}>{z.name}</MenuItem>
            })}
          </Select>
        </FormControl>
        }

      </CardContent>
      <CardActions>
        <Button size="small" style={{backgroundColor:COLOR.green,color:COLOR.white}} onClick = {()=>{history.push('/stock_detail/'+stock._id)}} >detail</Button>

        <Button size="small" style={{backgroundColor:COLOR.red,color:COLOR.white}} onClick={ async ()=>{
            const res = await remove_stock({stock_id:stock._id})
            if(res.success){
                onRemove(true)
            }
            else{
                onRemove(false)
            }
        }}>remove</Button>
      
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{remove_stock,change_zone_stock})(MediaCard)
