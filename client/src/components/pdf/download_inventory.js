import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stocks} from '../../actions/manager'
import moment from 'moment'
import {MyDocument} from './pdf'
import {ReportInventory} from './report_stock_inventory'
import {pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';

const generatePDFDocumentInv = async (data) => {
    console.log(data)
    
    const blobPdf =  pdf(ReportInventory(data));
    blobPdf.updateContainer(ReportInventory(data));
    const result = await blobPdf.toBlob();
  
    saveAs(result, "document.pdf");
  };
  
export default generatePDFDocumentInv;
