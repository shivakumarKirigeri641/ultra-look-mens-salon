const mongoose = require('mongoose');
const jobListSchema = mongoose.Schema({
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Staff'
    },
    serviceData:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ServicesList'
    }],
    timeOfServiceIDs:{
        type:Date,
        required:true,
        default:new Date()
    }
});
const JobList = mongoose.model('JobList', jobListSchema);
module.exports=JobList;