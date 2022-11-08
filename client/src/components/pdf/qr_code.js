import React from 'react';
import { Document, Page, Text,Image, View, StyleSheet,Font } from '@react-pdf/renderer';
import font_prompt from '../../resource/fonts/Prompt-Light.ttf'
import font_medium_prompt from '../../resource/fonts/Prompt-Medium.ttf'

import preview_image from '../../resource/images/previews.jpg'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
// Create styles
Font.register({ family: 'Prompt', src: font_prompt });
Font.register({ family: 'Prompt-Medium', src: font_medium_prompt });


// Create Document Component
export const  QR_CODE = () => (
  <Document>
   <Page  size="A4" wrap>
      
     
    </Page>
  </Document>
);
