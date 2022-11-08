import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import SearchInput from './textfield'
import * as COLOR from '../../utils/color';
import logo from '../../resource/images/staff/head/24.png';

import Button from '@mui/material/Button';

const FileUploader = props => {
  const [text,setText] = React.useState('')
  const handleChange = event => {
    //const fileUploaded = event.target.files[0];
    setText(event.target.value)
  };  
  const handleClick = event => {
    //const fileUploaded = event.target.files[0];
    console.log('click')
    props.onClick(event,text)
  };
  return (
 
       <div style={{justifyContent: 'center',alignItems:'center',textAlign:'center',marginLeft:10}}>
            <SearchInput placeholder={props.placeholder}
                  onChange={handleChange}
            /> 
            <Button onClick={handleClick}>
               <img src={logo} />
            </Button>
            
      </div>
  
  );
  
};
export default FileUploader;