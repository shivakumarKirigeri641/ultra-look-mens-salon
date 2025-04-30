const express = require('express');
const getCountOfServices = require("../utils/getCountOfServices");
const summaryRouter = express.Router();
const checkAuthentication = require('../middleware/checkAuthentication');
const filterServiceDataByDate = require('../utils/filterServiceDataByDate');
const ServicesList = require('../models/servicesList');
const JobList = require("../models/jobList");
//get summary of jobs for current day
summaryRouter.get('/staff/summary/today', checkAuthentication, async(req,res)=>{
    try{
     const staffdata = await JobList.findOne({staffId:req.userdata._id}).populate('staffId', 'firstName lastName').populate('serviceData.serviceIDs.serviceid', 'serviceName');    
     const today = new Date();
     const todayDay = today.getUTCDate();
     const todayMonth = today.getUTCMonth();
     const todayYear = today.getUTCFullYear();
     console.log(todayDay, todayMonth, todayYear);
     const filter = filterServiceDataByDate(staffdata, todayDay, todayMonth, todayYear);

     const servicelist = await ServicesList.find({});
     const serviceListWithCount0 = servicelist.map(x=>({_id:x._id, serviceName:x.serviceName, price:x.prices[x.prices.length-1].price, count:0}));     
     const listidfromsummary = filter.map(x=>(x.serviceIDs.map(y=>y.serviceid._id)));     
     const summaryListWithCount = getCountOfServices(serviceListWithCount0, listidfromsummary);
     
     res.status(200).json({status:'Ok', message:'Staff joblist fetched successfully.', data:summaryListWithCount});    
    } 
    catch(err){
     res.status(401).json({status:'Failed', message:err.message});
 }
 });
 
 //get summary of jobs for spcefic date
 summaryRouter.get('/staff/summary/:day/:month/:year', checkAuthentication, async(req,res)=>{
     try{
      const staffdata = await JobList.findOne({staffId:req.userdata._id}).populate('staffId', 'firstName lastName').populate('serviceData.serviceIDs.serviceid', 'serviceName');         
      const filter = filterServiceDataByDate(staffdata, parseInt(req.params.day), parseInt(req.params.month)-1, parseInt(req.params.year));
      res.status(200).json({status:'Ok', message:'Staff joblist fetched successfully.', data:filter});    
     } 
     catch(err){
      res.status(401).json({status:'Failed', message:err.message});
  }
  });


module.exports= summaryRouter;