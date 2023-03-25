const express = require('express');
const bcrypt = require('bcrypt');

const noteModel = require('../models/noteModel');
const jwt = require('jsonwebtoken');
const noteRouter = express.Router();

const authenticate = require("../Middleware/auth");

noteRouter.use(authenticate);

noteRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization;
    jwt.verify(token, "dev",async(err,decode)=>{
        try{
            let data = await noteModel.find({user:decode.userId})
            res.send({
                data:data,
                message:"success",
                
            })
        }catch(e){
            res.send({
             
                message:e.message,
                
            })
        }
    })

})

noteRouter.post("/create",async(req,res)=>{
    try{

        let note = new noteModel(req.body)
        await note.save()
        res.send({
            message:"Note created",
            status:1,
        })
    }catch(e){
        res.send({
            message:e.message,
            
        })
    }

})

noteRouter.patch("/",async (req,res)=>{
    let {id}= req.headers;
    try {
        await noteModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Note updated",
            
        })

    }catch(e){
        res.send({
            message:e.message,
            
        })
    }
})


noteRouter.delete("/",async (req,res)=>{
    let {id}= req.headers;
    try {
        await noteModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Note deleted",
            status:1,
        })

    }catch(e){
        res.send({
            message:e.message,
            status:0,
        })
    }
})

module.exports= noteRouter;
