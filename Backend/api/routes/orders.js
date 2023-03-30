const express=require('express');
const mongoose=require('mongoose');
const Order=require('../models/order');
const Product=require('../models/product');
const checkauth=require('../middleware/check-auth');
const router=express.Router();

router.get('/',checkauth,(req,res,next)=>{
    Order.find()
    .populate('product','name')
    .exec()
    .then((docs)=>{
        console.log(docs);
        res.status(200).json({
            count:docs.length,
            orders: docs.map((doc)=>{
                return {
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        Type:"GET",
                        URL:"http://localhost:3000/orders/" + doc._id
                    }
                }
            })
        })
    })
    .catch((err)=>{
        res.status(500).json({error:err});
    });
});
router.post('/',checkauth,(req,res,next)=>{
    Product.findById(req.body.productId)
    .then((product)=>{
        if(!product)
           return res.status(404).json({message:"Product Not found"});
        const order=new Order({
            _id:new mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity:req.body.quantity
        })
        return order.save()
    })
    .then((result)=>{
        console.log(result);
        res.status(201).json({
            message:"order created",
            createdOrder:{
                _id:result._id,
                productId:result.product,
                quantity:result.quantity
            },
            request:{
                Type:"GET",
                URL:"http://localhost:3000/orders/" + result._id
            }
        });
    })
    
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
    
});
router.get('/:orderId',checkauth,(req,res,next)=>{
    const id=req.params.orderId;
    Order.findById({_id:id})
    .populate('product')
    .select("_id product quantity")
    .exec()
    .then((order)=>{
        if(!order)
          return res.status(404).json({
            message:"Order Not Found"
          })
       console.log(order);
       res.status(200).json({
        message:"order fetched successfully",
        order:{
            _id:order._id,
            quantity:order.quantity,
            product:order.product
        },
        request:{
            type:"GET",
            URL:"http://localhost:3000/orders"
        }
       })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});
router.post('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"order id created"
    })
});
router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"order id updated"
    })
})
router.delete('/:orderId',checkauth,(req,res,next)=>{
    const id=req.params.orderId;
    Order.findOneAndDelete({_id:id})
    .exec()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message:"Order deleted successfully",
            order:{
                _id:result._id,
                quantity:result.quantity,
                product:result.product
            },
            request:{
                Type:"POST",
                URL:"http://localhost:3000/orders/",
                data:{productId:"number",quantity:"number"}
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    })
})
module.exports=router;
