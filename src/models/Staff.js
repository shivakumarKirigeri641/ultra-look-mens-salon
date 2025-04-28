const mongoose = require("mongoose");
const validator = require('validator');
const StaffSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            minLength:3,
            maxLength:30,
            required:true
        },
        lastName:{
            type:String,
            minLength:3,
            maxLength:30,
            required:true
        },
        email:{
            type:String,
            unique:true,            
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email!")
                }
            }
        },
        password:{
            type:String,          
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password is weak!")
                }
            }
        }
    }
);
const Staff = mongoose.model('Staff', StaffSchema);
module.exports=Staff;