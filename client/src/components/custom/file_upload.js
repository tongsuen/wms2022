
import React,  {useState}  from 'react'
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    //const fileUploaded = event.target.files[0];
    setFile(event.target.files[0])
    props.onChange(event)
  };

  const [file,setFile] = useState([])
  if(props.design == 1){
    return (
 
      <div style={{justifyContent: 'center',alignItems:'center',textAlign:'left',marginTop:10,marginBottom:40}}>
           <Button onClick={handleClick} style={{backgroundColor:'white',fontFamily:'kanit-regular',fontSize:16,borderColor:'black',borderWidth:1,borderStyle:"solid",color:'black',borderRadius:0}}>
             {props.title ? props.title : 'Upload'}
           </Button>
           <input type="file"
                 ref={hiddenFileInput}
                 onChange={handleChange}
                 style={{display:'none'}} 
           /> 

            <Typography style={{fontFamily:"kanit-regular",fontSize:16}}> {file.name}</Typography>
     </div>
 
 );
  }
  return (
 
       <div style={{justifyContent: 'center',alignItems:'center',textAlign:'center',padding:10}}>
            <Button onClick={handleClick} style={{backgroundColor:'white',fontFamily:'kanit-medium',fontSize:12,borderColor:'black',borderWidth:1,borderStyle:"solid",color:'black'}}>
              {props.title ? props.title : 'Upload'}
            </Button>
            <input type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{display:'none'}} 
            /> 

            <Typography style={{fontFamily:"kanit-regular",fontSize:16}}> {file.name}</Typography>
      </div>
  
  );
  
};
export default FileUploader;