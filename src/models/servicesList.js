const mongoose = require('mongoose');
const pricesSchema = mongoose.Schema(
    {
        fromDate:{
            type:Date,
            required:true
        },
        toDate:{
            type:Date,
            required:true
        },
        price:{
            type:Number,
            required:true,
            min:50,
            max:5000
        },
        discount:{
            type:Number,
            required:true,
            min:0,
            max:100,
            default:0                        
        }
    },{
        timestamps:true
    }
)
const servicesListSchema = mongoose.Schema(
    {
        serviceName:{
            type:String,
            required:true,
            unique:true,
            minLength:3,
            maxLength:50
        },
        prices:[pricesSchema]
    },{
        timestamps:true
    }
);
const ServicesList=mongoose.model('ServicesList', servicesListSchema);
module.exports=ServicesList;