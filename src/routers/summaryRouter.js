const express = require('express');
const summaryRouter = express.Router();
const checkAuthentication = require('../middleware/checkAuthentication');
const ServicesList = require('../models/servicesList');
const filterServiceDataByDate = require('../utils/filterServiceDataByDate');
const validateDate = require('../utils/validateDate');
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
     res.status(200).json({status:'Ok', message:'Staff joblist fetched successfully.', data:filter});    
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