
import { Doughnut } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {set_show_modal, accept_invoice} from '../../actions/manager'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import correct_icon from '../../resource/images/staff/head/25.png';
import fail_icon from '../../resource/images/staff/head/26.png';
import decline_icon from '../../resource/images/icon/decline.png';
import accept_icon from '../../resource/images/icon/accept.png';
import * as COLOR from '../../utils/color';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '4px solid black',
  boxShadow: 24,
  borderRadius:5,
  p: 4,
};
const ChartScreen = ({utils,set_show_modal}) => {
  
    const handleClose = () => set_show_modal(false);
  
    useEffect(async () => {
     
    },[]);
    
  return (<div>
                <Modal
                open={utils.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{padding:20}}
                >
                <Grid sx={style}>
                    <Grid container>
                        <Grid xs={3}>
                            {utils.type == 1 && <img src={accept_icon} />}
                            {utils.type == 2 && <img src={decline_icon} />}
                        </Grid>
                        <Grid xs={9}>
                            <Typography id="modal-modal-title" style={{fontFamily:'kanit-semibold',fontSize:30,marginTop:50,textAlign:'center'}}>
                               - {utils.title ? utils.title: 'Alert'}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    
                    <TextareaAutosize minRows={3} id="modal-modal-description" style={{height:"50%",textAlign:'center',borderWidth:0,width:"100%",marginTop:10,color:COLOR.peach,fontFamily:'kanit-medium',fontStyle:"italic",fontSize:24}} defaultValue= {utils.text}  sx={{ mt: 2 }}/>
                       
                    <Box style={{textAlign:'center',position:'relative'}}>    
                        <Button style={{borderRadius:20,backgroundColor:COLOR.white,color:COLOR.black,border:'2px solid white',fontFamily:'kanit-semibold',border:"1px solid black",fontSize:20,minWidth:100}}
                        onClick={handleClose}
                        >
                            ok
                        </Button>
                    </Box>
                 </Grid>
                
  
                </Modal>
            </div>)
}

const mapStateToProps = state => ({
    auth:state.auth,
    utils:state.utils
})
export default connect(mapStateToProps,{set_show_modal})(ChartScreen)
