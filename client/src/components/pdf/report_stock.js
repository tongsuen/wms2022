import React from 'react';
import { Document, Page, Text,Image, View, StyleSheet,Font } from '@react-pdf/renderer';
import font_kanit from '../../resource/fonts/Kanit-Regular.ttf'
import font_light from '../../resource/fonts/Kanit-Light.ttf'

import preview_image from '../../resource/images/logoreport.jpg'
import logo_image from '../../resource/images/menu/08logo@2x.png'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import moment from 'moment'
// Create styles
Font.register({ family: 'kanit-regular', src: font_kanit });

Font.register({ family: 'kanit-light', src: font_light });
const styles = StyleSheet.create({

    page: { flexDirection: "column", padding: 25 },
    table: {
        fontSize: 10,
        width: 550,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "stretch",
        flexWrap: "nowrap",
        alignItems: "stretch",
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 35,
        padding:0,
    },
    cell: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "stretch",
        width:"100%",
        textAlign:'center',
    },
    text_regular:{
        fontFamily:'kanit-regular',
    }, 
    text:{
        fontFamily:'kanit-light',
    },  
    size_big:{
        fontSize:14
    }, 
    size_normal:{
        fontSize:10
    }, 
    size_small:{
        fontSize:8
    }, 
    border:{
        borderColor:"black",
        borderWidth:1,
        padding:5
    },
    header: {
        backgroundColor: "#598b8b",
       
    },
    headerText: {

        fontWeight: 1000,
        margin: 8,
    },
    tableText: {
        margin: 10,
        fontSize: 10,
    },
    
    
 });
  

// Create Document Component
export  const  Report = (data) => (
  <Document>
   <Page style={styles.page} size="A4" wrap>
        <View style={[styles.row, styles.row]}>
                <View style={[styles.headerText, {position:"absolute",left:25,top:25}]}>
                        <Image src={preview_image} style={{width:50,height:50,resizeMode:'contain'}}/>
                </View>
               
                <View style={[styles.headerText, styles.cell]}>
                     
                    <Text style={[styles.text_regular,{textAlign:'center'},styles.size_big,{color:'black'}]} >บริษัท ตงสึ่นโลจิสติกส์ จำกัด</Text>
                    <Text style={[styles.text,{textAlign:'center'},styles.size_big,{color:'black'}]}> (TONGSUEN LOGISTICS CO,.LTD)</Text>   
                    <Text style={[styles.text,{textAlign:'center'},styles.size_normal,{color:'black'}]}> ติดต่อ 062-462-2938</Text>
                </View>
        </View>
        <View style={[styles.row, styles.row]}>
              
               
                <View style={[styles.headerText, styles.cell,{color:'black'}]}>
                     
                    <Text style={[styles.text_regular,{textAlign:'center'},styles.size_big]} >รายงานความเคลื่อนไหว</Text>
                    <Text style={[styles.text,{textAlign:'center'},styles.size_normal]}>วันที่ - {moment(data.search.start_date).format('DD/MM/yyyy')} {moment(data.search.end_date).format('DD/MM/yyyy')}</Text>
               </View>
        </View>
        <View style={styles.table}>
            <View style={[styles.row, styles.header,{color:'white',width:"100%"}]}>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:70}]}>รหัสลอต</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:70}]}>รหัสสินค้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:70}]}>ชื่อสินค้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>หน่วยนับ</Text>

                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>ยอดยกเข้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>ยอดเข้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>ยอดออก</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>จำนวนยกไป</Text>
            </View>
            {data.list.map((item)=>{
                return  <View style={[styles.row,{}]} wrap={false}>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:70}]}>{item.inventory &&item.inventory.lot_number}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:70}]}>{item.inventory &&item.inventory.product_code}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:70}]}>{item.inventory &&item.inventory.name}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.inventory &&item.inventory.unit}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.flow_balance.bring_forward}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.flow_balance.receive_amount}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.flow_balance.send_amount}</Text>
                            <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.flow_balance.balance}</Text>
                        </View>
            })}
           
           
        </View>
    </Page>
  </Document>
);
