import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
// Create styles
const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      },
    page: {
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

// Create Document Component
export  const  MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>


      <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Product</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Type</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Period</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Price</Text> 
          </View> 
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>React-PDF</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>3 User </Text> 
          </View> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>5€</Text> 
          </View> 
        </View> 
      </View>

    </Page>
  </Document>
);
