const jwt = require('jsonwebtoken');
require('dotenv').config();
const createJwtToken=async(req)=>{
    const token = await jwt.sign({_id:req.userdata._id}, process.env.SECRET_KEY);
    return token;
};
module.exports=createJwtToken;