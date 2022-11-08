const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth =require('../../middleware/auth')
const moment =  require('moment')


const User = require('../../models/User')
const Category = require('../../models/Category')
const Inventory = require('../../models/Inventory')
const Stocks = require('../../models/Stocks')
const StocksHistory = require('../../models/StocksHistory')
const Invoice = require('../../models/Invoices')
const Zone = require('../../models/Zone')
const Inbox = require('../../models/Inbox') 
const Note = require('../../models/Notes') 


router.post('/report_data', auth,async (req,res)=> {
    const {start_date,end_date,product_code = [],lot_number = [],product_name = [],type =1,is_customer= false } = req.body;
    try {
         let start =moment(start_date).startOf('day').toDate();
         let end =moment(end_date).endOf('day').toDate()
        
        if(type == 1){
            var query = []
            if(product_code.length > 0) query.push({product_code : {$in : product_code}}) 
            if(product_name.length > 0) query.push({name : {$in : product_name}}) 
            if(lot_number.length > 0) query.push({lot_number : {$in : lot_number}}) 
          
            console.log(query);
            var final_query = {}
            if(query.length == 0){
                final_query.create_date = {'$gte':start,'$lte':end};
                if(is_customer){
                    final_query.user = req.user.id
                }
            }
            else{
                if(is_customer)
                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true,user:req.user.id}
                else 

                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true}
            }


            var list = await Stocks.find(final_query).populate('inventory').populate({path: 'notes'})
            return res.json(list)
        }
        else  if(type == 2){
            var query = []
            if(product_code.length > 0) query.push({product_code : {$in : product_code}}) 
            if(product_name.length > 0) query.push({name : {$in : product_name}}) 
            if(lot_number.length > 0) query.push({lot_number : {$in : lot_number}}) 

            var final_query = {}
            if(query.length == 0){
                final_query.create_date = {'$gte':start,'$lte':end};
                if(is_customer){
                    final_query.user = req.user.id
                }
            }
            else{
                if(is_customer)
                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true,user:req.user.id}
                else 

                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true}
            }

            var list = await StocksHistory.find(final_query).populate('inventory')
           
            return res.json(list)
        }
        else if (type == 3){
            var query = []
            if(product_code.length > 0) query.push({product_code : {$in : product_code}}) 
            if(product_name.length > 0) query.push({name : {$in : product_name}}) 
            if(lot_number.length > 0) query.push({lot_number : {$in : lot_number}}) 

            var final_query = {}
            if(query.length == 0){
                final_query.create_date = {'$gte':start,'$lte':end};
                if(is_customer){
                    final_query.user = req.user.id
                }
            }
            else{
                if(is_customer)
                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true,user:req.user.id}
                else 

                    final_query = {$or:query,create_date:{'$gte':start,'$lte':end},is_active : true}
            }

            var list = await Invoice.find(final_query).populate('inventory').populate('stock')
           
            
            return res.json(list)
        }
        return res.status(400).send('Data Error')

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

module.exports = router; 
