const mongoose = require('mongoose');
const jobListSchema = mongoose.Schema({
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Staff'
    },
    timeOfServiceIDs:{
        type:Date,
        required:true,
        default:new Date()
    },
    serviceData:[{
        jobID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        isCombo:{
            type:Boolean,
            required:true,
            default:false
        },
        count:{
            type:Number,
            required:true,
            default:1
        }        
    }],    
    payments:[
        {
            mode:{
                type:String,
                required:true,
                default:0
            },
            amount:{
                type:Number,
                required:true,
                default:0
            }
        }
    ]});
const JobList = mongoose.model('JobList', jobListSchema);
module.exports=JobList;