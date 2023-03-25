const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
const token = req.headers.authorization
jwt.verify(token, "dev", (err,decode)=>{

if(err){
    return res.send({
        message:"token is not valid",
        status:2,
    })
}

    if(decode){
        req.body.user = decode.userId
        next()
    }else{
        res.send({
            message:"token is not valid",
            status:2,
        })
    }

})
}

module.exports=authenticate;