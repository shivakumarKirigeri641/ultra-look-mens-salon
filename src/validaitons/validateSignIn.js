const Staff = require("../models/Staff");
const argon2 = require('argon2');
const validateSignIn=async(req,res)=>{
    const {email, password} = req.body;
    //validate first email is there or not
    const emaildata = await Staff.findOne({email:email});    
    if(!emaildata){
        throw new Error('Invalide credentials!');
    }
    //once email valdation is successful, chck if password is correct/not    
    const ispasswordvalid = await argon2.verify(emaildata.password, password);
    console.log(ispasswordvalid);
    if(!ispasswordvalid){
        throw new Error('Invalide credentials!');
    }
    req.userdata = emaildata;
};
module.exports = validateSignIn;