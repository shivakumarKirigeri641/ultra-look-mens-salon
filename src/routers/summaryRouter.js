const express = require('express');
const getCountOfServices = require("../utils/getCountOfServices");
const summaryRouter = express.Router();
const checkAuthentication = require('../middleware/checkAuthentication');
const validateDate= require('../utils/validateDate');
const filterServiceDataByDate = require('../utils/filterServiceDataByDate');
const ServicesList = require('../models/servicesList');
const JobList = require("../models/jobList");
const { default: mongoose } = require('mongoose');
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
      //validate month and year here.
      const day = parseInt(req.params.day);
      const month = parseInt(req.params.month)-1;
      const year = parseInt(req.params.year);
      validateDate(day, month, year);
      const start = new Date();
      start.setMonth(month);
      start.setFullYear(year);
      start.setDate(day);
      start.setHours(0,0,0,0);
      const end = new Date();
      end.setMonth(month);
      end.setDate(day);
      end.setFullYear(year);
      end.setHours(23,59,59,0);
      
      const result = await JobList.find({
          timeOfServiceIDs: {
              $gte: start,
              $lt: end
            }
          }).populate('serviceData', 'serviceName');
      res.send(result)
     } 
     catch(err){
      res.status(401).json({status:'Failed', message:err.message});
  }
  });

  //get summary of jobs for month and year
 summaryRouter.get('/staff/summary/:month/:year', checkAuthentication, async(req,res)=>{
    try{
        //validate month and year here.        
        const month  = parseInt(req.params.month) - 1;
        const year = parseInt(req.params.year);
        console.log(month, year);
        if(month >12 || month <0){
            throw new Error('Invalid month provided!')
        }
        if(year < 2025){
            throw new Error('App is release in 2025, cannot fetch data before 2025!')
        }
        const start = new Date();
        start.setMonth(month);
        start.setFullYear(year);
        start.setDate(1);
        start.setHours(0,0,0,0);
        const end = new Date()
        end.setMonth(month+1);
        end.setDate(1);
        end.setFullYear(year);
        end.setHours(0,0,0,0);
        //console.log(start, end);
        const result = await JobList.find({
            timeOfServiceIDs: {
                $gte: start,
                $lt: end
              }
            }).populate('serviceData', 'serviceName');
        res.send(result)
    } 
    catch(err){
     res.status(401).json({status:'Failed', message:err.message});
 }
 });
 //get summary of jobs for year
 summaryRouter.get('/staff/summary/:year', checkAuthentication, async(req,res)=>{
    try{
        //validate month and year here.
        const year = parseInt(req.params.year);
        if(year < 2025){
            throw new Error('App is release in 2025, cannot fetch data before 2025!')
        }
        const start = new Date();
        start.setMonth(0);
        start.setFullYear(year);
        start.setDate(2);
        start.setHours(0,0,0,0);


        const end = new Date()
        end.setMonth(11);
        end.setDate(1);
        end.setFullYear(year);
        end.setHours(0,0,0,0);
        //console.log(start, end);
        const result = await JobList.find({
            timeOfServiceIDs: {
                $gte: start,
                $lt: end
              }
            }).populate('serviceData', 'serviceName');
        res.send(result)
    } 
    catch(err){
     res.status(401).json({status:'Failed', message:err.message});
 }
 });


module.exports= summaryRouter;