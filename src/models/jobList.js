const mongoose = require('mongoose');
const jobListSchema = mongoose.Schema({
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Staff'
    },
    serviceData:[{
        serviceID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'ServicesList'
        },
        count:{
            type:Number,
            required:true,
            default:0
        },        
    }],
    timeOfServiceIDs:{
        type:Date,
        required:true,
        default:new Date()
    },
    isOnlinePaid:{
        type:Boolean,
        required:true,
        default:true
    }
});
const JobList = mongoose.model('JobList', jobListSchema);
module.exports=JobList;