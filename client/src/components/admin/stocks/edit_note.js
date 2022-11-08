import React,  {Fragment,useState,useEffect}  from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {get_note,update_note,set_show_modal} from '../../../actions/manager'

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {Image} from 'react-bootstrap'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import UploadFileButton from '../../../components/custom/multi_upload'
import * as COLOR from '../../../utils/color';
import moment from 'moment'

import save from '../../../resource/images/staff/head/31.png';
const EditNote  = ({get_note,update_note,set_show_modal}) => {
    const [note,setNote] = useState(null)
    const [deletes,setDeletes] = useState([])
    const history = useHistory()
    const [newImages,setNewImages] = useState([])
    let { note_id } = useParams();
    useEffect(async () => {

        const res = await get_note({note_id:note_id})
        console.log(res.data);
        if(res.success){
            setNote(res.data)
        }
       
      },[]);
    const onChangeImages = files => {
        setNewImages(files)
    };
    const onChange = e => {
        console.log(e.target.value)
        setNote({ ...note,[e.target.name]:e.target.value})
    };
    return (
        <div style={{ height: 400, width: '100%',marginBottom:20 }}>
             
            <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:28,color:COLOR.dark_green}}>เเก้ไข</Typography>
            <Grid container style={{padding:10,marginTop:20,backgroundColor:COLOR.peach,height:60,borderWidth:2,borderStyle:'solid',borderBottomWidth:0}}>
             
            </Grid>
            {note && 
            <Box style={{backgroundColor:COLOR.gray,marginTop:0,minHeight:500,padding:20,borderWidth:2,borderStyle:'solid',minWidth:1358}}>
               <Grid container style={{backgroundColor:COLOR.white,padding:10,paddingLeft:"10%",paddingRight:'10%',width:"auto",paddingTop:50}} >
                
                    <Grid xs = {12}>
                       
                            
                                <TextField name='detail' placeholder='detail' size='small' style={{paddingBottom:5,width:"100%"}} multiline rows={3} onChange = {onChange} value={note.detail}></TextField>
   
                    
                    </Grid>
                   
                    <ImageList variant="quilted" cols={4} gap={8}>
                                       
                                        {note.images.map((img,index)=>{
                                           return <ImageListItem style={{position:"relative"}} key={img} style={{minHeight:100,minWidth:100}} >
                                                        <Image
                                                            src={`${img}`}
                                                            srcSet={`${img}`}
                                                            loading="lazy"
                                                            style={{minHeight:40,maxWidth:200}}
                                                            responsive
                                                        />
                                                    <Button onClick={()=> {
                                                            setDeletes([...deletes,img]);
                                                            const list = [...note.images]
                                                            let imgs = list.filter(item => item != img)
                                                            console.log(imgs)
                                                            setNote({...note,images:imgs})
                                                        }} style={{zIndex:99,top:0,left:0,backgroundColor:COLOR.red,position:"absolute",color:COLOR.white}}>delete</Button>

                                                    <Typography style={{fontFamily:'kanit-regular',fontSize:12 ,marginTop:5,overflow:'hidden'}}>{img}</Typography>
                                                    </ImageListItem>
                                        })}
                    </ImageList>
                     <Grid xs = {12}>
                                <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >       
                                    <Typography style={{fontFamily:'kanit-regular',fontSize:16 ,padding:5}}>หมายเหตุ <span style={{color:COLOR.red}}>*</span></Typography>
                            
                                    
                                    <UploadFileButton onDeleteFile= {(files) => { 
                                        setNewImages(files)}} 
                                        multiple accept="image/png, image/jpeg, image/jpg"  onChange = {onChangeImages} name='images' design = {1} title='Add file/photo' />
                             
                                </Box>
                    </Grid>
                     <Grid xs = {12} align="center">
                        <Box style={{padding:10,backgroundColor:COLOR.white,margin:0}} >
                             <img
                                src={save}
                                width='45'
                                height='45'
                                loading="lazy"
                                style={{position:'absolute',zIndex:99,marginTop:39,marginLeft:-10,borderWidth:2,borderStyle:'solid',borderColor:COLOR.brown,borderRadius:25,backgroundColor:COLOR.white}}
                            />
                        <Button style={{marginTop: 40,paddingLeft:20,borderRadius:0,color:COLOR.white,fontFamily:'kanit-medium',fontStyle:'italic',width:110,fontSize:18,backgroundColor:COLOR.brown,borderRadius:20}} 
                            
                             onClick = {async()=> {
                                 console.log(deletes)
                                var res = await update_note({note_id:note._id,detail:note.detail,deletes:deletes,images:newImages});
                                console.log(res);                           
                                if(res.success){
                                    set_show_modal(true,1,'Update!','success edit')    
                                    history.goBack()   
                                }
                                else{
                                    set_show_modal(true,2,'Fail!',res.msg)
                                }
                            }}>  SAVE</Button>
                        </Box>

           
                    </Grid>
                </Grid>         
                      
            </Box>
              }
        </div>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_note,update_note,set_show_modal})(EditNote)
