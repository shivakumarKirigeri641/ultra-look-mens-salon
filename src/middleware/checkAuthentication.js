const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');
const checkAuthentication=async(req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error('Session expired!');
        }
        const result = await jwt.verify(token,process.env.SECRET_KEY);
        if(!result){
            throw new Error('Session expired!');
        }
        const userdata = await Staff.findOne({_id:result._id});
        if(!userdata){
            throw new Error('Something went wrong');
        }
        req.userdata  = userdata;
        next();
    }
    catch(err){
        res.status(401).json({status:'Failed',message:err.message});
    }
};
module.exports= checkAuthentication;