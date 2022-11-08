
import Button from '@mui/material/Button';

import React,  {useState,useEffect}  from 'react'
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Close';
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
            <Button onClick={handleClick} style={{backgroundColor:'white',fontFamily:'kanit-regular',fontSize:16,borderColor:'black',borderWidth:1,borderStyle:"solid",color:'black',borderRadius:0}}>
                {props.title ? props.title : 'Upload'}
            </Button>
            <input type="file"
                    multiple
                    ref={hiddenFileInput}
                    id='input_multiple_files'
                    onChange={handleChange}
                    style={{display:'none'}} 
            /> 
            {loading > 0 && <div>กำลังแปลงภาพ HIEC IMAGE TO JPG...</div>} 
            <ImageList sx={{ width: 500, }} cols={3} rowHeight={164}>
              
                  {array.map((item,index) => (
                    <ImageListItem key={item.url} >
                      <img
                        src={item.url}
                        alt={''}
                      />
                      <ImageListItemBar
                        style={{position:"absolute",top:0,height:50}}
                        title={item.name}
                        subtitle={''}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'red' }}
                            aria-label={`info about ${item.name}`}
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
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
            
        </div>
  
  );
  
};
export default FileUploader;