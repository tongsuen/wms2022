const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth =require('../../middleware/auth')
const moment =  require('moment')

const {upload_inboxs,upload_invoices,upload_notes,upload_inventories,delete_obj} = require('../../s3')
const {sendMessage} = require('../../push_noti')
const User = require('../../models/User')
const Category = require('../../models/Category')
const Inventory = require('../../models/Inventory')
const Stocks = require('../../models/Stocks')
const StocksHistory = require('../../models/StocksHistory')
const Invoice = require('../../models/Invoices')
const Zone = require('../../models/Zone')
const Inbox = require('../../models/Inbox') 
const Note = require('../../models/Notes') 
const Alert = require('../../models/Alert') 
const Sector = require('../../models/Sector') 

router.post('/create_inbox',[auth,upload_inboxs.array('files')],async (req,res)=> {
        const {type} = req.body
    try {
        console.log(req.files);//req.file.path
        console.log(req.body);
        const by_user = await User.findById(req.user.id)
        if(type == 1){ //user send to admin

            const inbox = await Inbox.create(req.body)
            if(req.files){
                await Promise.all(req.files.map(async (file) => {
                    inbox.files.push(file.location)
                }))
            
                inbox.save();
            }
            
            const alert = new Alert({
                inbox:inbox,
                type:1, 
                user:by_user,
                by_user:by_user,
                subject:'ข้อความถึงผู้ดูเเล',
                detail:('ข้อความ: '+inbox.detail)
            })

            send_noti(1,[],'ข้อความถึงผู้ดูเเล',inbox.detail);
            const io = req.app.get('socketio');
            io.to('admin').emit('action', {type:'new_alert',data:alert});
            await alert.save()

            return res.json(inbox)
        }
        else if(type == 2){ // admin send to user

            const inbox = await Inbox.create(req.body)
            
            if(req.files){
                await Promise.all(req.files.map(async (file) => {
                    inbox.files.push(file.location)
                }))
                inbox.save();
            }
            console.log(inbox);
            send_noti(3,inbox.tos,'ผู้ดูเเลระบบส่งข้อความ',inbox.detail);
            await Promise.all(inbox.tos.map(async (user) => {
                const alert = new Alert({
                    inbox:inbox,
                    user:user,
                    by_user:by_user,
                    type:2,
                    subject:'ผู้ดูเเลระบบส่งข้อความ',
                    detail:('ข้อความ: '+inbox.detail)
                })
                await alert.save()
                console.log(alert.user)
                const io = req.app.get('socketio');
                io.to(alert.user.toString()).emit('action', {type:'new_alert',data:alert});
            }))
            return res.json(inbox)
        }
        return res.status(500).send('need body')
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_inbox',auth,async (req,res)=> {

    const {type,page = 1,limit = 10} = req.body;
    try {
  
        const list = await Inbox.find({type:type}).sort({create_date: -1}).populate('from','_id email name').populate('to','_id email name').populate('tos','_id email name').skip((page - 1) * limit).limit(limit);
        const total = await Inbox.countDocuments({type:type});
        
        return   res.json({
            page:page,
            list:list,
            total:total
        })
      
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_customer_inbox',auth,async (req,res)=> {

    const {type,page = 1,limit = 10} = req.body;
    try {
      
        
        const list = await Inbox.find({tos:req.user.id}).sort({create_date: -1}).populate('from','_id email name').populate('to','_id email name').populate('tos','_id email name').skip((page - 1) * limit).limit(limit);
        const total = await Inbox.countDocuments({tos:req.user.id});
        
        return   res.json({
            page:page,
            list:list,
            total:total
        })
      
      
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_customer_send_inbox',auth,async (req,res)=> {

    const {type,page = 1,limit = 10} = req.body;
    try {
        
        
        const list = await Inbox.find({from:req.user.id}).sort({create_date:-1}).populate('from','_id email name').populate('to','_id email name').populate('tos','_id email name').skip((page - 1) * limit).limit(limit);
        const total = await Inbox.countDocuments({from:req.user.id});
        
        return   res.json({
            page:page,
            list:list,
            total:total
        })
      
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/get_inbox',auth,async (req,res)=> {

    try {
        const {inbox_id} = req.body
      
        const inbox = await Inbox.findOne({_id:inbox_id}).populate('from','_id email name').populate('to','_id email name').populate('tos','_id email name')
        return  res.json(inbox)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/create_category', auth,async (req,res)=> {
    const {name,user} = req.body;
    try {
        const cat = new Category({name,user});
        await cat.save()
        res.json(cat)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/add_note_to_stock', [auth,upload_notes.array('images')],async (req,res)=> {
    const {detail = '',stock_id} = req.body;
    try {
       
        const note = new Note({detail});

        await Promise.all(req.files.map(async (file) => {
            note.images.push(file.location)
        }))
        console.log(note)
        await note.save()
        const stock = await Stocks.findOne({_id:stock_id})
        console.log(stock)
        if(stock.notes){
            stock.notes.unshift(note)
        }
        else{
            stock.notes.push(note)
        }
        
       
        await stock.save()
        return res.json(note)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_notes_from_user', auth,async (req,res)=> {
    const {page = 1,limit=10} = req.body;
    try {
       
        const list = await Stocks.find({notes:{ $exists: true, $ne: [] }, user:req.user.id}).populate('inventory').populate('notes').skip((page - 1) * limit).limit(limit).sort({create_date:-1})
        const total = await Inventory.countDocuments({notes:{ $exists: true, $ne: [] }, user:req.user.id});

        return res.json({
            page:page,
            list:list,
            total:total
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_note', auth,async (req,res)=> {
    const {note_id} = req.body;
    try {
        const note = await Note.findById(note_id)

        console.log(note)
       return res.json(note)
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/update_note',[auth,upload_notes.array('images')], auth,async (req,res)=> {
    const {note_id,detail,deletes} = req.body;
    try {
        console.log(req.body)
        const note = await Note.findByIdAndUpdate({_id:note_id},{detail:detail})
      
        if(deletes && deletes.length > 0){
            let new_img = [...note.images]
         
            for (let i = 0; i < deletes.length; i++) {
                const del_img = deletes[i];
                let found = false
                console.log(del_img)
                
                for (let j = 0; j < note.images.length; j++) {
                    const img = note.images[j];
                    if(del_img == img){
                        found = true                  
                    }
                }
                if(found) {
                    delete_obj(del_img)
                    new_img = new_img.filter(url => url != del_img)

                    console.log(new_img)
                }
            }
            note.images = new_img
        }
        await Promise.all(req.files.map(async (file) => {
            note.images.push(file.location)
        }))
        if(!detail && note.images.length == 0){
            await Note.deleteOne({_id:note._id})
            const st = await Stocks.updateMany({notes:{_id:note._id}},{$pull:{notes:note_id}})
            //st.notes = st.notes.filter(nt => nt != note._id)
            console.log(st)
            return res.json({})
        }
    //     note.images = [
    //         'https://wms-tslog.s3.ap-southeast-1.amazonaws.com/notes/2022-04-20T04%3A47%3A36.878Z-png-clipart-foreign-object-damage-tray-tool-boxes-aircraft-aircraft-material-transport-thumbnail.png',
    //    'https://wms-tslog.s3.ap-southeast-1.amazonaws.com/notes/2022-04-20T04%3A47%3A37.409Z-cardboard-box-isolated_125540-652.jpeg',
    //         'https://wms-tslog.s3.ap-southeast-1.amazonaws.com/notes/2022-04-20T04%3A47%3A37.633Z-OFM5004948.jpeg'
    //      ],
        await note.save()
       return res.json(note)
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/import_inventory', [auth,upload_inventories.array('images')],async (req,res)=> {

    try {
        console.log(req.file);//req.file.path
        console.log(req.body);
        const inv = new Inventory(req.body);

        await Promise.all(req.files.map(async (file) => {
            inv.images.push(file.location)
        }))
        inv.current_amount = inv.amount
        await inv.save()
        res.json(inv)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/update_inventory', [auth,upload_inventories.array('images')],async (req,res)=> {

    try {
        console.log(req.files);//req.file.path
        console.log(req.body);
        var query = req.body;
        if(!query.exp_date){
            query.exp_date = null
        } 
        if(!query.mfg_date) {
            query.mfg_date = null
        }
        if(!query.product_code) {
            query.product_code = null
        }
        
        let inv = await Inventory.findById(query.inv_id)
        if(query.old_images){
            let difference = inv.images.filter(x => !query.old_images.includes(x))
            for (let i = 0; i < difference.length; i++) {
                const old = difference[i];
                delete_obj(old)
            }
            inv.images = query.old_images
            inv = await inv.save()
        }
        else{
            for (let i = 0; i < inv.images.length; i++) {
                const old = inv.images[i];
                delete_obj(old)
            }
            inv.images = []
            inv = await inv.save()
        }
        if(req.files){
            var array = inv.images
            await Promise.all(req.files.map(async (file) => {
                array.push(file.location)
            }))
            query.images = array;
        }
       
        Inventory.findOneAndUpdate({_id: query.inv_id},{$set:query},{new:true, upsert: false},function(err,data){
            if(err){
                console.log(err);
               return res.status(500).json(err);
            } else {
                    console.log(data);
                    
                    return res.json(data);
            }
        });

        

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/inventory_waiting', auth,async (req,res)=> {
    const {user,search,is_in_stock,} = req.body;
    try {

        var query ={};
        query.is_in_stock = false;
        console.log(query)
        const list = await Inventory.find(query)

        res.json(list)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_inventory', auth,async (req,res)=> {
    const {user,search,is_in_stock,page = 1,limit = 10} = req.body;
    try {
        var query ={};
        if(user!== undefined) query.user = user;
        
        if(is_in_stock !== undefined) query.is_in_stock = is_in_stock;
        if(search !== undefined && search != '') query = {...query,$text:{$search: search }}
        console.log(query)
        const list = await Inventory.find(query).sort({create_date:-1}).skip((page - 1) * limit).limit(limit);
        const total = await Inventory.countDocuments(query);

        res.json({
            page:page,
            list:list,
            total:total
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_stocks', auth,async (req,res)=> {
    const {user,search,status,page = 1,limit = 10} = req.body;
    try {
        
        console.log(req.body);
        
        var query ={is_active:true};
        if(user!== undefined) query.user = user;
        if(status!== undefined) query.status = status;
        if(search !== undefined && search != '') query = {...query,$text:{$search: search }}
        console.log(query);
        // if(search) {
        //     query.inventory = {name:{$regex : search}} ;
        // }
        const list = await Stocks.find(query).populate({path:'inventory',populate:{path:'user',model:'user'}}).populate('zone').skip((page - 1) * limit).limit(limit)
                            .sort({create_date:-1});
        const total = await Stocks.countDocuments(query);
        //console.log(list);
        res.json({
            page:page,
            list:list,
            total:total
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_zone', auth,async (req,res)=> {
    const {main,sort} = req.body;
    try {
        console.log("LIST ZONE");
        let query = {}
        let sort = {}
        if(main) query.main = main
        if(main == 'A' || main == 'B' ||main == 'C' ||main == 'D' ||main == 'E' ||main == 'F' || main == 'G' ||main == 'H'){
            sort =  {
                main:1,
                y:1,
                x:1,
             
            }
        }
        else{
            sort =  {
                main:1,
                y:-1,
                x:1,
             
            }
        }
        const result2 = await Zone.aggregate([
          {
              $match:query
          },
            {
                $lookup:
                    {
                    from: Stocks.collection.name,
                    pipeline:[
                        {
                            $match:{
                                is_active:true
                            }
                            
                        },
                        {
                            $lookup:{
                                from:Inventory.collection.name,
                                localField:'inventory',
                                foreignField:'_id',
                                as:'inventories'
                            }
                        },
                        {
                            $lookup:{
                                from:User.collection.name,
                                localField:'user',
                                foreignField:'_id',
                                as:'users'
                            }
                        }
                        

                        
                    ],
                    localField: "_id",
                    foreignField: "zone",
                    as: "stocks"
                    }
            },
            {
                $sort: sort
               
            }
        ])

        console.log(result2)
        res.json(result2)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_zone_for_choose', auth,async (req,res)=> {
    const {main,sort} = req.body;
    try {
        console.log("LIST ZONE");
        let query = {}
        if(main) query.main = main

        const result2 = await Zone.aggregate([
          {
              $match:query
          },
            {
                $sort:
                {
                    main:1,
                    x:1,
                    y:1,
                }
            }
        ])

        console.log(result2)
        res.json(result2)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/list_zone_with_sector', auth,async (req,res)=> {
    const {} = req.body;
    try {
        console.log("LIST ZONE");
        const list_sector = await Sector.find();
        
        const result2 = await Zone.aggregate([
          
            {
                $lookup:
                    {
                    from: Stocks.collection.name,
                    pipeline:[
                        {
                            $match:{
                                is_active:true
                            }
                            
                        }
                        
                    ],
                    localField: "_id",
                    foreignField: "zone",
                    as: "stocks"
                    }
            },
            {
                $sort:
                {
                    x:1,
                    y:1
                }
            }
        ])

        console.log(result2)
        res.json(result2)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/zone_with_stock', auth,async (req,res)=> {
    const {zone_id} = req.body;
    try {
        
        const zone = await Zone.findOne({_id:zone_id})
        const list = await Stocks.find({zone:zone,is_active:true})
        
        res.json(list)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
router.post('/invoice_stocks_out', auth,async (req,res)=> {
    const {stocks} = req.body;
    console.log(req.body);
    
    try {

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/import_to_stocks', auth,async (req,res)=> {
    const {inventory,zone,amount=0} = req.body;
    try {
        console.log(req.body)
        const inv = await Inventory.findOne({_id:inventory})
        const z = await Zone.findOne({_id:zone})
        const by_user = await User.findById(req.user.id)
        console.log(inv);
        if(inv.current_amount < amount){
            
            return res.status(400).json({message:'your number are more than exist number of inventory'})
        }
        const stock = new Stocks({zone});
        stock.name =inv.name
        stock.product_code =inv.product_code
        stock.lot_number =inv.lot_number
        
        stock.inventory = inv;
        stock.current_amount =  amount;
        stock.user = inv.user;
        await stock.save()

        if(amount == inventory.current_amount){
            inv.current_amount = 0;
            inv.is_in_stock = true;
            await inv.save();
        }
        else{
            inv.current_amount = inv.current_amount - amount;
            inv.is_in_stock =  inv.current_amount == 0 ? true:false;
            await inv.save();
        }
        const flow_balance = {
            balance : inv.amount,
            bring_forward :0,
            receive_amount:amount,
            send_amount:0,

        }
        const stock_in = new Invoice();
        stock_in.type = 1;
        stock_in.flow_balance = flow_balance;
        stock_in.amount = amount;
        stock_in.inventory = inv;
        stock_in.user = inv.user;
        stock_in.stock = stock;
        stock_in.zone_in_name = z.name;
        stock_in.name = inv.name;
        stock_in.product_code =inv.product_code;
        stock_in.lot_number = inv.lot_number;
        //console.log(stock_in)
        await stock_in.save();
        console.log(stock_in)

        send_noti(3,[stock_in.user],'นำสินค้าเข้าคลัง',inv.name + ' ถูกนำเข้าคลังสินค้าเรียบร้อยเเล้ว');

        const alert = new Alert({
            invoice:stock_in,
            user:stock_in.user,
            by_user:by_user,
            type:3,
            subject:'นำสินค้าเข้าคลัง',
            detail:inv.name + ' ถูกนำเข้าคลังสินค้าเรียบร้อยเเล้ว'
        })
        await alert.save()

        const io = req.app.get('socketio');
        io.to(alert.user).emit('action', {type:'new_alert',data:alert});
        res.json(stock)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/export_out_stock_prepare', auth,async (req,res)=> {
    const {stock_id,amount} = req.body;
    try {
        const stock = await Stocks.findById(stock_id);
        const total = stock.prepare_out + amount;
        // if(total > stock.current_amount){
            
        //     return res.status(400).send('wrong number')
        // }

        if(stock.current_amount == amount){
            stock.prepare_out = amount; 
     
        }
        else{

            stock.prepare_out = stock.current_amount - amount;
           
        }
        stock.status = 2;
        await stock.save()
        res.json(stock)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/export_out_stock', [auth,upload_invoices.array('files')],async (req,res)=> {
    const {stock_id,amount} = req.body;
    try {
        const stock = await Stocks.findById(stock_id).populate('zone');
        const b_f = stock.current_amount ;

        if(stock.current_amount == amount){
            stock.current_amount = 0;
            stock.is_active = false;
            await stock.save()
        }
        else{
            stock.current_amount = stock.current_amount - amount;
            await stock.save()
        }
        const flow_balance = {
            balance : stock.current_amount,
            bring_forward :b_f,
            receive_amount:0,
            send_amount:amount,

        }
        const stock_out = new Invoice();
        stock_out.type = 2;
        stock_out.flow_balance = flow_balance;
        stock_out.amount = amount;
        stock_out.stock = stock;
        stock_out.inventory = stock.inventory;
        stock_out.user = stock.user;
        stock_out.name = stock.name;
        stock_out.product_code = stock.product_code;
        stock_out.lot_number = stock.lot_number;
        stock_out.zone_out_name = stock.zone.name
        if(req.files){
            var array = []
            await Promise.all(req.files.map(async (file) => {
                array.push(file.location)
            }))
            stock_out.files = array;
        }
        
        await stock_out.save();
        const by_user = await User.findById(req.user.id)

        send_noti(1,[],'คำร้อง','ต้องการนำสินค้าออกจากคลัง');

        const alert = await Alert({
            invoice:stock_out,
            type:4,
            user:stock_out.user,
            by_user:by_user,
            subject:'คำร้อง',
            detail:'ต้องการนำสินค้าออกจากคลัง'
        })
        await alert.save()


        const io = req.app.get('socketio');
        io.to('admin').emit('action', {type:'new_alert',data:alert});

        res.json(stock)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/export_out_stock_action', auth,async (req,res)=> {
    const {stock_out_id,action} = req.body;
    try {
        console.log(req.body)
        const stock_out = await Invoice.findOne({_id:stock_out_id})
        const by_user = await User.findById(req.user.id)

        console.log(stock_out)
        if(action == 1)// accept
        {
            stock_out.status = 2;
            send_noti(3,[stock_out.user],'นำสินค้าออกสำเร็จ','สินค้าของคุณได้รับการอนุมัติให้ออกจากคลังสินค้าแล้ว');
            const alert = new Alert({
                invoice:stock_out,
                type:5,
                by_user:by_user,
                user:stock_out.user,
                subject:'นำสินค้าออกสำเร็จ',
                detail:'สินค้าของคุณได้รับการอนุมัติให้ออกจากคลังสินค้าแล้ว'
            })
            await alert.save()

            console.log(alert)
            const io = req.app.get('socketio');
            io.to(alert.user._id).emit('action', {type:'new_alert',data:alert});
        }
        else if(action == 2)//decline
        {
            stock_out.status = 0;
            const stock = await Stocks.findById(stock_out.stock);
            stock.current_amount = stock.current_amount + stock_out.amount;
            stock.is_active = true;
            stock.status = 1;
            send_noti(3,[stock.user],'นำสินค้าออกไม่สำเร็จ','ไม่สามารถเอาสินค้าออกจากคลังสินค้าได้ โปรดติดต่อเจ้าหน้าที่');
            await stock.save()
            const alert = new Alert({
                invoice:stock_out,
                type:6,
                by_user:by_user,
                user:stock_out.user,
                subject:'นำสินค้าออกไม่สำเร็จ',
                detail:'ไม่สามารถเอาสินค้าออกจากคลังสินค้าได้ โปรดติดต่อเจ้าหน้าที่'
            })
            await alert.save()
            console.log(alert)
            const io = req.app.get('socketio');
            io.to(alert.user._id).emit('action', {type:'new_alert',data:alert});
        }
        
        await stock_out.save()
        res.json(stock_out)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_customer', auth,async (req,res)=> {
    try {

        const list = await User.find({admin:false})
        console.log(list);
        
        res.json(list)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_invoice', auth,async (req,res)=> {
    const {user,search,start,end,type,page = 1,limit = 10} = req.body;
    try {
        console.log(req.body);
        
        var query ={
        };
        if(start && end) query.create_date = { $gte: start, $lte: end}
        if(user!== undefined) query.user = user;
        if(type!== undefined) query.type = type;
        if(search !== undefined && search != '') query = {...query,$text:{$search: search }}
        console.log(query)
        const list = await Invoice.find(query).populate('inventory').populate({path: 'stock',
        populate: {
          path: 'zone'
        } }).populate('user','-password').sort( { create_date: -1 } ).skip((page - 1) * limit).limit(limit);
        const total = await Invoice.countDocuments(query);
        console.log(list);
        
        res.json({
            page:page,
            list:list,
            total:total
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_invoice_unlimit', auth,async (req,res)=> {
    const {user,page = 1,limit = 10,type} = req.body;
    try {
        console.log("OUT STOCKS");
        
        var query ={};
        if(user!== undefined) query.user = user;
        if(type!== undefined) query.type = type;
        
        const list = await Invoice.find(query).populate('inventory').populate('user','-password');
    
        console.log(list);
        
        res.json(list)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_invoice', auth,async (req,res)=> {
    const {invoice_id} = req.body;
    try {
        console.log(req.body)
        const inv = await Invoice.findOne({_id:invoice_id}).populate('inventory').populate('stock').populate('user','-password');
        console.log(inv);
        
        return res.json(inv)

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/update_stock', auth,async (req,res)=> {

    const {stock_id,current_amount,zone} = req.body;
    try {

        const stock = await Stocks.updateOne({_id:stock_id},{current_amount,zone})
   
        res.json(stock)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_stock', auth,async (req,res)=> {

    const {stock_id,search} = req.body;
    try {

        const stk = await Stocks.findOne({_id:stock_id}).populate('inventory').populate('notes')
   
        res.json(stk)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/change_zone_stock', auth,async (req,res)=> {

    const {stock_id,zone_id} = req.body;
    try {

        const stk = await Stocks.findOne({_id:stock_id})
        stk.zone = zone_id;
        await stk.save()
   
        res.json(stk)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/remove_stock', auth,async (req,res)=> {

    const {stock_id,} = req.body;
    try {

        const stk = await Stocks.findOne({_id:stock_id})
        stk.is_active = false;
        stk.status = -1;//remove by user
        await stk.save()
   
        res.json(stk)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/get_stocks_history', auth,async (req,res)=> {

    const {date} = req.body;
    try {

        const list = await StocksHistory.find({create_date:date})
   
        res.json(list)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_alert_customer', auth,async (req,res)=> {

    const {is_read,} = req.body;
    try {
        
       // console.log(req.user.id);
        const list = await Alert.find({user:req.user.id,$or:[{type:2},{type:3},{type:5},{type:6}]}).populate('by_user','name avatar').sort({create_date: -1}).limit(10)
        const total = await Alert.countDocuments({user:req.user.id,is_read:false,$or:[{type:2},{type:3},{type:5},{type:6}]});
       // console.log(list);
        
        res.json({list,total})
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_alert_staff', auth,async (req,res)=> {
    const {limit,} = req.body;
    try {

        const list = await Alert.find({$or:[{type:1},{type:4}]}).populate('by_user','name avatar').sort({create_date: -1}).limit(10)
        const total = await Alert.countDocuments({$or:[{type:1},{type:4}],is_read:false})
       // console.log(list);
        
        res.json({list,total})
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/list_alert', auth,async (req,res)=> {
    const {admin=false,user,page = 1,limit=10} = req.body;
    try {
        
        if(admin){
            const list = await Alert.find({$or:[{type:1},{type:4}]}).populate('by_user','name avatar').sort({create_date: -1}).skip((page - 1) * limit).limit(limit);

            const total = await Alert.countDocuments({$or:[{type:1},{type:4}]});
        // console.log(list);
            
            return res.json({
                page:page,
                list:list,
                total:total
            })
        }
        else{
              // console.log(req.user.id);
            const list = await Alert.find({user:req.user.id,$or:[{type:2},{type:3},{type:5},{type:6}]}).populate('by_user','name avatar').sort({create_date: -1}).skip((page - 1) * limit).limit(limit);
         
            const total = await Alert.countDocuments({user:req.user.id,$or:[{type:2},{type:3},{type:5},{type:6}]});
            // console.log(list);
                
            return res.json({
                page:page,
                list:list,
                total:total
            })
        }
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/alert_count',auth,async (req,res)=> {

    const {admin} = req.body;
    try { 
        if(admin){
            const total = await Alert.countDocuments({user:req.user.id,is_read:false});
            return   res.json({total:total})
        }else{
            const total = await Alert.countDocuments({$or:[{type:1},{type:4}],is_read:false,user:req.user.id})
            return   res.json({total:total})
        }

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/set_read_alert',auth,async (req,res)=> {

    const {admin} = req.body;
    try {
        
        if(admin){
            const list = await Alert.find({$or:[{type:1},{type:4}],is_read:false,});
            console.log(list)
            await Promise.all(list.map(async (alert) => {
                alert.is_read = true;
                await alert.save()
            }))  
            return   res.json(list)
        }
        else{
              // console.log(req.user.id);
            const list = await Alert.find({user:req.user.id,is_read:false,$or:[{type:2},{type:3},{type:5},{type:6}]});
             await Promise.all(list.map(async (alert) => {
                alert.is_read = true;
                await alert.save()
            }))  
            console.log(list)
            return   res.json(list)
        }
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/create_zone', auth,async (req,res)=> {

    const {zone_id,sector_number = 1,name,x,y} = req.body;
    try {
        if(zone_id){
            const zone = await Zone.update({_id:zone_id},{name,x,y});
            return zone
        }
        var zone = new Zone();
        zone.name = y+name + ("0" + x).slice(-2);
        zone.main = name;
        zone.x = x;
        zone.y = y;
        await zone.save();
        console.log(zone)
        return res.json(zone)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/get_category', auth,async (req,res)=> {

    const {user} = req.body;
    try {

        const list = await Category.find({user})
        
        res.json(list)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/get_user', auth,async (req,res)=> {

    const {} = req.body;
    try {

        const list = await User.find()
   
        res.json(list)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/save_stock_to_history', auth,async (req,res)=> {
    const {date} = req.body;
    // var end_date = new Date(start_date)
    // end_date =  end_date.addDays(1)
    // console.log(end_date); 
    try {
        const current_day = moment()
        console.log(current_day);
        
        await StocksHistory.deleteMany({day:current_day.format('D'),month:current_day.format('M'),year:current_day.format('YYYY')})

        const list = await Stocks.find({is_active:true});
        for(const index in list){
            const stock = list[index];

            const item = new StocksHistory();
            item.inventory = stock.inventory;
            item.zone = stock.zone;
            item.stock = stock;
            item.current_amount = stock.current_amount;
            item.user = stock.user;
            item.name = stock.name;
            if(stock.product_code)item.product_code = stock.product_code;
            item.lot_number = stock.lot_number;
            item.day = current_day.format('D');
            item.month = current_day.format('M');
            item.year = current_day.format('YYYY');
            item.create_date = current_day;
            await item.save();
            
        }
       
        const h_list = await StocksHistory.find();
        res.json(h_list)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/list_history', auth,async (req,res)=> {
    const {date,user,page = 1,limit=10} = req.body;
    // var end_date = new Date(start_date)
    // end_date =  end_date.addDays(1)
    try {
        console.log(user);
        
        if(date !== undefined){

            const current_day = moment(date,'YYYY-M-D')
            var query = {day:current_day.format('D'),month:current_day.format('M'),year:current_day.format('YYYY')}
            if(user) query.user = user;

            const list = await StocksHistory.find(query).populate('inventory').populate('user','-password').populate('zone').skip((page - 1) * limit).limit(limit);
            const total = await StocksHistory.countDocuments(user);
            return res.json({
                page:page,
                list:list,
                total:total
            })
        }

        var query = {}
        if(user) query.user = user

        const list= await StocksHistory.find(query).populate('inventory').populate('user','-password').populate('zone').skip((page - 1) * limit).limit(limit);
           
        const total = await StocksHistory.countDocuments(query);

            return res.json({
                page:page,
                list:list,
                total:total
            })

    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})

router.post('/remove_stocks_history', auth,async (req,res)=> {
    const {date} = req.body;
    // var end_date = new Date(start_date)
    // end_date =  end_date.addDays(1)
    // console.log(end_date); 
    try {
        
        if(date){
            const current_day = moment(date,'YYYY-M-D')
            const list= await StocksHistory.deleteMany({day:current_day.format('D'),month:current_day.format('M'),year:current_day.format('YYYY')})
            return res.json(list)
        }
        const list = await StocksHistory.deleteMany();
     
        res.json(list)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.get('/reset_data',async (req,res)=> {
    const {date} = req.body;
    // var end_date = new Date(start_date)
    // end_date =  end_date.addDays(1)
    // console.log(end_date); 
    try {
        
        const sh = await StocksHistory.deleteMany();
        const iv = await Inventory.deleteMany();
        const ct = await Category.deleteMany();
        const nots = await Note.deleteMany();

        const ibx = await Inbox.deleteMany();
        const alert = await Alert.deleteMany();
        const ivo = await Invoice.deleteMany();
        const stk = await Stocks.deleteMany();
        //const z = await Zone.deleteMany();
        res.json('delete')
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
function randomDate(start, end) {
    return ''
}
router.get('/add_dummy_data',async (req,res)=> {
    const {name} = req.query;
    console.log(name)
    try{
        let array = [];
        for (let y = 1; y <= 5; y++) {
           for (let x = 1; x <= 4; x++) {
               array.push({name:name,x:x,y:y})
           }  
        }
        await Promise.all(array.map(async (obj) => {
            var zone = new Zone();
            zone.name = obj.x+obj.name + ("0" + obj.y).slice(-2);
            zone.main = obj.name;
            zone.x = obj.x;
            zone.y = obj.y;
            await zone.save() 
        }))
        res.json(name)
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
const send_noti = async (type = 1,users_id =[],title,msg='') => {
    if(type == 1){
        //send push to all admin
        const users = await User.find({"expo_token":{$exists:true},admin:true})
        console.log(users)
        sendMessage(users,title,msg)
    }
    if(type == 2){
        //send push to all admin
        const users = await User.find({"expo_token":{$exists:true},admin:false})
        console.log(users)
        sendMessage(users,title,msg)
    }
    if(type == 3){
        const users = await User.find({"expo_token":{$exists:true},"_id" : { $in : users_id }})
        console.log(users)
        sendMessage(users,title,msg)
    }
 
}
router.get('/send_notifications',async (req,res)=> {
    
    try{
        send_noti(1,[],'tongsuen.','hello world');
        res.json('')
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
router.post('/send_data_with_socket',async (req,res)=> {
    const {user_id} = req.query;
    try{
       
        const io = req.app.get('socketio');
        if(user_id) 
            io.to(user_id).emit('action', {type:'new_alert',data:{__v: 0,

                _id: "62d79f4c8f51e2d0jy1d8d7e57",
                
                by_user: {_id: "61541ba9050c89869bdc0f68", name: "มิวกี้ ไปรยา", avatar: "https://wms-tslog.s3.ap-southeast-1.amazonaws.com/…022-03-30T09%3A03%3A53.682Z-images%20%283%29.jpeg"},
                
                create_date: "2022-07-20T06:23:08.696Z",
                
                detail: "ข้อความ: test 3",
                
                inbox: "62d79f4c8f51e2d01d8d7e55",
                
                is_read: false,
                
                subject: "ผู้ดูเเลระบบส่งข้อความ",
                
                type: 2,
                
                user: "625e74e93bfb221679d4b45a"}});
        else 

            io.to('admin').emit('action', {type:'new_alert',data:{__v: 0,

                _id: "62d79f4c8ffe51e2d01d8d7e57",
                
                by_user: {_id: "61541ba9050c89869bdc0f68", name: "มิวกี้ ไปรยา", avatar: "https://wms-tslog.s3.ap-southeast-1.amazonaws.com/…022-03-30T09%3A03%3A53.682Z-images%20%283%29.jpeg"},
                
                create_date: "2022-07-20T06:23:08.696Z",
                
                detail: "ข้อความ: test 3",
                
                inbox: "62d79f4c8f51e2d01d8d7e55",
                
                is_read: false,
                
                subject: "ผู้ดูเเลระบบส่งข้อความ",
                
                type: 2,
                
                user: "625e74e93bfb221679d4b45a"}});
        res.json({})
        
    }catch(err){
        console.log(err.message);
        res.status(500).send(err.message)
    }
})
module.exports = router; 
