const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quantity:{type:Number,default:1},
    product:{type:mongoose.Schema.Types.ObjectId, ref:'product',required:true}
});

module.exports=mongoose.model('order',orderSchema);