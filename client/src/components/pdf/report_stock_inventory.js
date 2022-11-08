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
    pageBackground: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
        backgroundColor:'red'
      },
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
    cell_notes: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "stretch",
        width:"100%",
        textAlign:'left',
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
        fontSize:10,
        fontFamily:'kanit-regular',
    }, 
    size_small:{
        fontSize:8,
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
export  const  ReportInventory= (data) => (
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
                     
                    <Text style={[styles.text_regular,{textAlign:'center'},styles.size_big]} >รายงานสินค้า</Text>
                    <Text style={[styles.text,{textAlign:'center'},styles.size_normal]}>วันที่ - {moment(data.search.start_date).format('DD/MM/yyyy')} {moment(data.search.end_date).format('DD/MM/yyyy')}</Text>
                </View>
        </View>
        
        <View style={styles.table}>
            <View style={[styles.row, styles.header,{color:'white',width:"100%"}]}>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:100}]}>รหัสลอต</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:100}]}>รหัสสินค้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:100}]}>ชื่อสินค้า</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>หน่วยนับ</Text>

                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>หน่วยย่อย</Text>
                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>จำนวน</Text>
            </View>
            {data.list.map((item)=>{
                return  <View  wrap={false}>
                            <View style={[styles.row,{width:"100%"}]}>
                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:100}]}>{item.inventory.lot_number}</Text>
                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:100}]}>{item.inventory.product_code}</Text>
                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:100}]}>{item.inventory.name}</Text>
                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.inventory.unit}</Text>

                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.inventory.sub_unit}</Text>
                                <Text style={[styles.cell,styles.text_regular,styles.size_small,styles.border,{width:50}]}>{item.inventory.amount}</Text>
                                
                            </View>
                            
                            <View  style={[styles.row,{width:"100%"}]}>
                                <View>{item.notes.map(note=>{
                                            return <View style={{marginBottom:20,marginTop:20}} break>
                                                        <View style={[styles.row,{marginLeft:50,marginBottom:20}]}>

                                                            <Text style={[styles.cell_notes,styles.text_regular,styles.size_normal,{width:100,textAlign:'left'}]}>-{moment(data.create_date).format('DD/MM/yyyy')}</Text>
                                                            <Text style={[styles.cell_notes,styles.text_regular,styles.size_normal,{textAlign:'left'}]}>{note.detail}</Text>  
                                                     
                                                        </View> 
                                                        <View style={[{flexDirection: 'row',
                                                                        flexWrap:'wrap',
                                                                        justifyContent: 'space-between',
                                                                        backgroundColor: 'white',},{marginLeft:50,marginBottom:10,marginRight:50}]} >

                                                        {note.images.map((img,index)=>{
                                                                if(index % 2 == 0){
                                                                    return <Image src={{ uri: img, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={[{objectFit:'contain',width:'40%',marginBottom:10}]} />
                                                                       
                                                                }
                                                                else{
                                                                    return <Image src={{ uri: img, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={[{objectFit:'contain',width:'40%'}]} />
                            
                                                                }
                                                        })}
                                                        </View> 
                                                    </View>
                                            
                                          })}
                                </View>
                                
                            </View>
                        </View>
            })}
            {/* <View style={styles.table}>
            {data.list.map((item)=>{
                    return <View>{item.notes.map(note=>{
                        return <View style={[styles.row,]}>
                                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>{item.inventory.name}</Text>
                                <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>{moment(data.create_date).format('DD/MM/yyyy')}</Text>
                                 <Text style={[styles.text_regular,styles.headerText, styles.cell,styles.size_small,{width:50}]}>{note.detail}</Text>
                                {note.images.map(img=>{
                                    return <Image src={{ uri: img, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={{width:"30%"}} />
       
                                })}
                                </View>

                    })}</View>
                        
                })} 
            </View>              */}
           
        </View>
    </Page>
  </Document>
);
