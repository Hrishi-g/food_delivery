const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    email:{
        type:String,
        required:true,
        unqiue:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('orders',OrdersSchema)