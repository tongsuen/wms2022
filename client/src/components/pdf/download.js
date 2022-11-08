import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stocks} from '../../actions/manager'
import moment from 'moment'
import {MyDocument} from './pdf'
import {Report} from './report_stock'
import {ReportWarehouse} from './report_stock_warehouse'
import {pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';

const generatePDFDocument = async (data) => {
    console.log(data)
    
    const blobPdf =  pdf(Report(data));
    blobPdf.updateContainer(Report(data));
    const result = await blobPdf.toBlob();
  
    saveAs(result, "document.pdf");
  };
  
export default generatePDFDocument;
