import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {get_stocks} from '../../actions/manager'
import moment from 'moment'
import DowloadPdf from './download'
import {PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      flexDirection: "row"
    },
    section: {
      flexGrow: 1
    }
  });
const Screen  = ({auth,get_stocks}) => {

    const [data,setData] = useState(null)
  
    useEffect(async () => {
        const res = await get_stocks()
        console.log(res);
        if(res.success){
            setData(res.data.list)
        }
      },[]);
    return (
        <>    {data &&   
        <Button onClick = {async()=> await DowloadPdf(data)}>
            Click To Download Pdf
        </Button>}
            

        </>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{get_stocks})(Screen)
