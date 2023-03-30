const express=require('express');
const { default: mongoose } = require('mongoose');
const multer=require('multer');
const checkauth=require('../middleware/check-auth');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ file.originalname);
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload=multer({storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
});

const router=express.Router();
const Product=require('../models/product');

router.get('/',(req,res,next)=>{
   Product.find()
   .select("_id name price productImage")
   .exec()
   .then((doc)=>{
     const response={
        count:doc.length,
        products: doc.map((result)=>{
            return {
                id:result._id,
                name:result.name,
                price:result.price,
                productImage:result.productImage,
                request:{
                    type:"GET",
                    URL:"http://localhost:3000/products/"+result._id
                }
            }
        })
     }
     res.status(200).json(response);
   })
   .catch((err)=>{
    console.log(err);
    res.status(500).json({error:err});
   })
});

router.post('/',checkauth,upload.single('productImage'),(req,res,next)=>{
    console.log(req.file);
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });

    product.save().then((result)=>{
        console.log(result);
        res.status(201).json({
            message:"product added successfully",
            products:{
                id:result._id,
                name:result.name,
                price:result.price,
                productImage:result.productImage,
                request:{
                    type:"GET",
                    URL:"http://localhost:3000/products/"+result._id
                }
            }
        });
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    })
    
});

router.get('/:productId',(req,res,next)=>{
    const id=req.params.productId;
    Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc)=>{
        console.log(doc);
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    request:{
                        type:"GET All Products",
                        URL:"http://localhost:3000/products/"
                    }
                }
            });
        }else{
            res.status(404).json({message:"No valid entry found for provided Id!"});
        }
        
    }).catch((err)=>{
       console.log(err);
       res.status(500).json({error:err});
    });
});

router.post('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:"id added",
    })
});

router.patch('/:productId',checkauth,(req,res,next)=>{
    const id=req.params.productId;
    const updateops={};
    for(let ops of req.body){
        updateops[ops.propName]=ops.value;
    }
    Product.findOneAndUpdate({_id:id},{$set:updateops}).exec().then((result)=>{
        console.log(result);
        res.status(200).json({
            message:"product updated",
            request:{
                type:"GET",
                URL:"http://localhost:3000/products/"+result._id
            }
        });
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    })

});

router.delete('/:productId',checkauth,(req,res,next)=>{
   const id=req.params.productId;
   Product.findOneAndRemove({_id:id})
   .exec()
   .then((result)=>{
    console.log(result);
    res.status(200).json({
        message:"product deleted",
        request:{
            type:"POST",
            URL:"http://localhost:3000/products/",
            data:{ name:"string" , price:"Number"}
        }
    });
   })
   .catch((err)=>{
    console.log(err);
    res.status(500).json({error:err});
   })
});

module.exports=router;
