const express = require('express');
const checkAuthentication = require('../middleware/checkAuthentication');
const JobList = require("../models/jobList");
const ServiceElements = require("../models/jobList");
const servicesRouter = express.Router();

//add/update the jobs based on staff
servicesRouter.post('/staff/updateservices', checkAuthentication, async(req, res)=>{
    try{

        const arrayofserviceids = req.body.serviceIDs;
        let serviceelements = [];
        arrayofserviceids.forEach(element => {
            serviceelements.push({serviceid:element})
        });
        const data = {
            staffId:req.userdata._id,
            serviceData:{serviceIDs:serviceelements}
        };
        const staffdata = await JobList.findOne({staffId:req.userdata._id})
        if(!staffdata){        
            const result = new JobList(data);
            await result.save();
        }
        else{
            staffdata.serviceData.push({serviceIDs:serviceelements});
            await staffdata.save();
        }
        res.send('testing')
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
//get summary of jobs from staff raissed.
servicesRouter.get('/staff/staffsummary', checkAuthentication, async(req,res)=>{
   try{
    console.log(req.userdata._id);
    //const staffdata = await JobList.findOne({staffId:req.userdata._id}).populate('staffId', 'firstName lastName').populate('serviceIds', 'serviceName');
    const staffdata = await JobList.findOne({staffId:req.userdata._id}).populate('staffId', 'firstName lastName').populate('serviceData.serviceIDs.serviceid', 'serviceName');
    res.status(200).json({status:'Ok', message:'Staff joblist fetched successfully.', data:staffdata});
   } 
   catch(err){
    res.status(401).json({status:'Failed', message:err.message});
}
});


module.exports=servicesRouter;