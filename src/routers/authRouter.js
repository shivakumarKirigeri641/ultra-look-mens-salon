const express = require('express');
const argon2 = require('argon2');
const createJwtToken = require('../utils/createJwtToken');
const Staff = require('../models/Staff');
const validateSignIn = require('../validaitons/validateSignIn');
const validateSignUp = require('../validaitons/validateSignUp');
const authRouter = express.Router();

//staff login
authRouter.post('/staff/login', async(req, res)=>{
    try{
        await validateSignIn(req, res);        
        const token = await createJwtToken(req);
        res.cookie('token', token);
        res.status(200).json({status:'Ok', message:'Logged successfully.', data:req.userdata});
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
//staff logout
authRouter.post('/staff/logout', async(req, res)=>{
    try{
        res.cookie('token', null, {expires:new Date(Date.now())});
        res.status(200).json({status:'Ok', message:'Logged out successfully.'});
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
//staff signup
authRouter.post('/staff/signup', async(req, res)=>{
    try{        
        if(!validateSignUp(req, res)){
            throw new Error("Invalid details provided for signup!");
        }                
        const isemailalreadyexists = await Staff.findOne({email:req.body.email});
        if(isemailalreadyexists){
            throw new Error("Staff already exists!");
        }
        const staff = new Staff({firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:await argon2.hash(req.body.password)});
        await staff.save();
        res.status(200).json({status:'Ok', message:'SignedUp successfully.'});
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
module.exports=authRouter;