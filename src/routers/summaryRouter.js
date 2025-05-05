const express = require('express');
const summaryRouter = express.Router();
const checkAuthentication = require('../middleware/checkAuthentication');
const validateDate= require('../utils/validateDate');
const ServciesList = require('../models/servicesList');
const getpriceAndCountWithDate = require('../utils/getpriceAndCountWithDate');
const JobList = require("../models/jobList");
const { default: mongoose } = require('mongoose');
//get summary of jobs for current day
summaryRouter.get('/staff/summary/today', checkAuthentication, async(req,res)=>{
    try{
        //validate month and year here.
        const serviceList = await ServciesList.find({});
        const start = new Date();
        start.setDate(5);
        start.setMonth(4);
        start.setHours(0,0,0,0);
        const end=new Date();
        end.setDate(start.getDate());
        end.setMonth(start.getMonth());
        end.setHours(23,59,59,0);
        
        const result = await JobList.find({
            $and:[
            {staffId:req.userdata._id},
            {timeOfServiceIDs: {
                $gte: start,
                $lt: end
              }
            }]});
            const summaryData = getpriceAndCountWithDate(result, serviceList);
            res.status(200).json({status:'Ok', data:summaryData});
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
      
      const serviceList = await ServciesList.find({});
      const result = await JobList.find({$and:[
        {staffId:req.userdata._id},
        {timeOfServiceIDs: {
            $gte: start,
            $lt: end
          }
        }]});
        const summaryData = getpriceAndCountWithDate(result, serviceList);
        res.status(200).json({status:'Ok', data:summaryData});
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
        const serviceList = await ServciesList.find({});
        const result = await JobList.find({$and:[
            {staffId:req.userdata._id},
            {timeOfServiceIDs: {
                $gte: start,
                $lt: end
              }
            }]});
            const summaryData = getpriceAndCountWithDate(result, serviceList);
        res.status(200).json({status:'Ok', data:summaryData});
    } 
    catch(err){
     res.status(401).json({status:'Failed', message:err.message});
 }
 });

 //temp
 summaryRouter.post('/staff/updatedate', async(req,res)=>{
    const serviceList = await ServciesList.find({});
    //680f7ac33a888bbb8878d98e
    serviceList.forEach(async element => {
        const result = await ServciesList.findById(element._id);    
        result.prices[result.prices.length-1].toDate = new Date();
        await result.save(); 
    });    
    res.send('result')
 })


module.exports= summaryRouter;