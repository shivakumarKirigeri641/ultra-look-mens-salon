const mongoose = require('mongoose');
const serviceElements = mongoose.Schema({
    serviceid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'ServicesList'
    },
    timeOfIndividualService:{
        type:Date,
        required:true,
        default:new Date(Date.now())
    }
})
const jobListSchema = mongoose.Schema({
    staffId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Staff'
    },
    serviceData:[
        {
            serviceIDs:[serviceElements],
            timeOfServiceIDs:{
                type:Date,
                required:true,
                default:new Date(Date.now())
            }
        }
    ]
});
const JobList = mongoose.model('JobList', jobListSchema);
module.exports=JobList;