const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/usersignup');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const checkauth=require('../middleware/check-auth')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='application/pdf' ){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload=multer({storage:storage,
    limits:{
        fileSize:1024*512
    },
    fileFilter:fileFilter
});

router.post('/signup',upload.single('resume'),(req,res,next)=>{
    console.log(req.file);

    User.find({email:req.body.email})
    .exec()
    .then((user)=>{
        if(user.length>=1){
            res.status(200).send({
                success: false,
                message:"Email already exist"
            });
        }else{
            if(req.file==undefined)
              {
                return res.status(500).json({
                    error:"File type is wrong"
                })
              }
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    });
                }else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash,
                        username:req.body.username,
                        resume:req.file.path
                    });
        
                    user.save()
                    .then((result)=>{
                        console.log(result);
                        res.status(200).send({
                            success: true,
                            message:"user created"
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }
    })
});

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((user)=>{
        console.log(user);
        if(user.length<1){
           return res.status(200).json({
                success:false,
                message:"Auth Failed"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(200).json({
                    success:false,
                    message:"Auth Failed"
                });
            }

            if(result){
                const token=jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                 process.env.JWT_KEY,
                {
                    expiresIn:"1h"
                }
                )
                return res.status(200).json({
                    success:true,
                    message:"Auth Success",
                    token:token,
                    resume:user[0].resume,
                    id:user[0]._id
                });
            }
            res.status(200).json({
                success:false,
                message:"Auth Failed"
            });
        })
    })
    .catch((err)=>{
        res.status(500).json({error:err});
    });
})
router.delete('/:userId',checkauth,(req,res,next)=>{
    User.findOneAndRemove({_id:req.params.userId})
    .exec()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message:"User deleted successfully"
        });
    })
    .catch((err)=>{
        res.status(500).json({error:err});
    });
})
router.get('/',checkauth,(req,res,next)=>{
    User.find().exec()
    .then((users)=>{
        //console.log(users);
        res.status(200).json({
            count:users.length,
            user:users.map((val)=>{
                return val;
            })
        })
    })
    .catch((err)=>{
         res.status(500).json({error:err});
    })
})
router.get('/:userId',checkauth,(req,res,next)=>{
    //var id = new mongoose.Types.ObjectId(req.params.userId);
    User.findOne({_id:req.params.userId})
    .exec()
    .then((user)=>{
         console.log(user);
         if(user.length<1)
         {
              return res.status(200).json({
              message:"Can't Fetch the User"
              })
         }else{
            res.status(200).json({
                message:"User Fetched Successfully",
                resumeLink: "http://localhost:3000/"+ user.resume,
                username: user.username,
                email:user.email
            });
         }
    })
    .catch((err)=>{
        res.status(500).json({
            error:err
        });
    })
})
module.exports=router;