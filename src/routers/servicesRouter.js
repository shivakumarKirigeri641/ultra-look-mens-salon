const express = require('express');
const checkAuthentication = require('../middleware/checkAuthentication');
const JobList = require("../models/jobList");
const ServicesList = require('../models/servicesList');
const ComboLists = require('../models/comboLists');
const servicesRouter = express.Router();


//staff - feed
servicesRouter.get('/staff/feed', checkAuthentication, async(req, res)=>{
    try{
        let servcieslist = await ServicesList.find({});
        let comboserviceslist = await ComboLists.find({}).populate('serviceID', 'serviceName');
        servcieslist = servcieslist.map(x=>({
            _id:x._id,
            serviceName:x.serviceName,
            createdAt:x.createdAt,
            updatedAt:x.updatedAt,
            price:x.prices[x.prices.length-1].price
        }));
        res.status(200).json({status:'Ok', message:'Data fetched successfully', 
            data:{
                loggedInUser:
                {firstName:req.userdata.firstName, lastName:req.userdata.lastName},
                servcieslist,
                comboserviceslist
                }})
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});

//generic - feed
servicesRouter.get('/feed', async(req, res)=>{
    try{
        let servcieslist = await ServicesList.find({});
        servcieslist = servcieslist.map(x=>({
            _id:x._id,
            serviceName:x.serviceName,
            createdAt:x.createdAt,
            updatedAt:x.updatedAt,
            price:x.prices[x.prices.length-1].price
        }));        
        res.status(200).json({status:'Ok', message:'Data fetched successfully', standardServiceData:servcieslist, comboServiceData:comboserviceslist});
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});

//add/update the jobs based on staff
servicesRouter.patch('/staff/updateservices', checkAuthentication, async(req, res)=>{
    try{

        const arrayofserviceids = req.body.serviceIDs;        
        const data = {
            staffId:req.userdata._id,
            serviceData:arrayofserviceids
        };
        const result = new JobList(data);
        await result.save();
        res.status(200).json({status:'Ok', message:'Jobs added successfully.', data:result});
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
module.exports=servicesRouter;