const mongoose = require('mongoose');

const StocksHistorySchema = new mongoose.Schema({

    inventory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'inventory',
    },
    stock:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stocks',
    },
    zone:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'zone',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    day:{
        type:Number
    },
    month:{
        type:Number,
    },
    year:{
        type:Number,
    },
    name:{
        type:String,
        required:true,
    },
    lot_number:{
        type:String,
        required:true,
    },
    product_code:{
        type:String,
    },

    current_amount:{
        type:Number,
        default:0
    },
    is_active:{
        type:Boolean,
        default:true
    },
    create_date : {
        type : Date,
        default : Date.now
    }
});

module.exports = StocksHistory = mongoose.model('stocks_history',StocksHistorySchema)