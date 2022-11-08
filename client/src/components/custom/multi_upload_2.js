
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Close';
import React,  {useState,useEffect}  from 'react'
import * as COLOR from '../../utils/color';
import Grid from '@mui/material/Grid';
import heic2any from "heic2any";
const FileUploader = props => {
  const [files,setFiles] = useState([])
  const [array,setArray] = useState([])

  const [loading,setLoading] = useState(0)
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
 
    for (let i = 0; i < event.target.files.length; i++) {
      if(event.target.files[i].type == 'image/heic'){
        setLoading(loading + 1)
        fetch(URL.createObjectURL(event.target.files[i]))
        .then((res) => res.blob())
        .then((blob) => heic2any({
          blob,
          toType: "image/jpeg",
          quality: 0.5, // cuts the quality and size by half
        }))
        .then((conversionResult) => {
          console.log('covert heic')
          setArray(array => [...array,{url:URL.createObjectURL(conversionResult),name:event.target.files[i].name}])
          setFiles(files => [...files,conversionResult])
          setLoading(loading-1)
        })
        .catch((e) => {
          console.log("error");
          setLoading(loading-1)
        });
      }
      else{
        console.log('normal files')
        
        setArray(array =>[...array,{url:URL.createObjectURL(event.target.files[i]),name:event.target.files[i].name}])
        setFiles(files => [...files,event.target.files[i]])
      }
      //
    }
    
  };
 
  useEffect(()=>{
    console.log(array)
  },[array])

  useEffect(()=>{
    console.log(files)
    props.onChange(files)
  },[files])
  
  return (

      <div style={{justifyContent: 'center',alignItems:'center',textAlign:'left',marginTop:10,marginBottom:0}}>
            <Button onClick={handleClick} style={{backgroundColor:COLOR.green,fontFamily:'kanit-medium',minWidth:120,fontSize:16,borderColor:'white',borderWidth:1,borderStyle:"solid",color:COLOR.white,borderRadius:20}}>
                {props.title ? (props.title + (' ')+(files.length > 0 ? files.length : '')) : 'Upload'}
            </Button>
            <input type="file"
                    multiple
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{display:'none'}} 
            /> 
            <br/>
            {loading > 0 && <div>กำลังแปลงภาพ HIEC IMAGE TO JPG...</div>}
            {files.map((file,index) =>{
              return <Grid key={index} container style={{height:33,minWidth:350,paddingLeft:10,alignItems:'center',fontFamily:'kanit-medium',fontSize:12,justifyContent:'left',borderWidth:2,borderStyle:'solid',borderColor:COLOR.green,borderRadius:10,margin:5}}>
                <Grid xs={11}  style={{overflow:'hidden',height:33,paddingTop:5}}>
                {file.name} 
                </Grid>
                <Grid xs={1}>
                <IconButton
                  sx={{ color: 'red' }}
                  aria-label={`info about ${file.name}`}
                  style={{height:33,width:33,marginRight:5}}
                  onClick={(e) =>{
                    const s = array.filter((item, idx) => index !== idx);
                    setArray(s);
                    var newFileList = Array.from(files);
                    newFileList.splice(index,1)
                    setFiles(newFileList)
                    
                    props.onDeleteFile(newFileList)
                    hiddenFileInput.current.value = null;
                    console.log(s);
                  }}
                >
                  <InfoIcon />
                </IconButton> 
                </Grid>
                
              </Grid>
            })}
        </div>
  
  );
  
};
export default FileUploader;