
import { Doughnut } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {set_loading} from '../../actions/manager'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import * as COLOR from '../../utils/color';

 function Loading({utils,set_loading}) {
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => set_loading(false);
  
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={utils.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

const mapStateToProps = state => ({
    utils:state.utils,

})
export default connect(mapStateToProps,{set_loading})(Loading)

