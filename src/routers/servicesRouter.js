const express = require('express');
const getPayment = require('../utils/getPayment');
const checkAuthentication = require('../middleware/checkAuthentication');
const JobList = require("../models/jobList");
const ServicesList = require('../models/servicesList');
const ComboLists = require('../models/comboLists');
const isDateWithinRange = require("../utils/isDateWithinRange");
const getRandomInt=require('../utils/getRandomNumber');
const servicesRouter = express.Router();


//staff - feed
servicesRouter.get('/staff/feed', checkAuthentication, async(req, res)=>{
    try{
        let servcieslist = await ServicesList.find({});
        let comboserviceslist = await ComboLists.find({}).populate('combos.serviceID', 'serviceName');
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
                }});
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
        //modification needed after joblist schema change
        const arrayofserviceids = req.body.serviceIDs;        
        const data = {
            staffId:req.userdata._id,
            serviceData:arrayofserviceids
        };
        /*const result = new JobList(data);
        await result.save();
        res.status(200).json({status:'Ok', message:'Jobs added successfully.', data:result});*/
    }
    catch(err){
        res.status(401).json({status:'Failed', message:err.message});
    }
});
servicesRouter.post('/staff/updatejoblist', checkAuthentication, async(req, res)=>{
    try{

        const startDate = new Date();
        startDate.setFullYear(2025);
        startDate.setMonth(0);
        startDate.setDate(1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth()+5, 1);
        const servicelist = await ServicesList.find({});
        const combolist = await ComboLists.find({});
        while (startDate <= endDate) {
            console.log('processing date:', startDate);
            const staff = '68148ecf2cda77812784b11d';            

            //servicedata per day
            let totaltime = getRandomInt(7, 13);
            for(let time=1;time<totaltime;time++){
                let servicedatacount = getRandomInt(1,7);
                let payments = [];
                let servicedata = [];            
                //eg; u get 10 service data for this day.
                for(let i=0;i<servicedatacount;i++){
                    let jobId=0;
                    let count=0;
                    let isCombo=false;
                    let iscombofetch= getRandomInt(0,1);                
                    if(0===iscombofetch){
                        //std
                        jobId = servicelist[getRandomInt(0, servicelist?.length-1)]._id;
                        count = getRandomInt(1, 8);
                        isCombo=false;
                    }
                    else{
                        //combo
                        jobId = combolist[getRandomInt(0, combolist?.length-1)]._id;
                        count = getRandomInt(1, 8);
                        isCombo=true;
                    }                
                    servicedata.push({jobID:jobId, isCombo:isCombo, count:count})
                }
                let totalamt = getPayment(servicedata, startDate, servicelist, combolist);
                if(0 === getRandomInt(0,1)){
                payments.push({mode:'ONLINE', amount:totalamt}, {mode:'CASH', amount:0})
                }
                else{
                    payments.push({mode:'ONLINE', amount:0}, {mode:'CASH', amount:totalamt})
                }
                startDate.setHours(time+7, getRandomInt(0,30,0,));
                const jsonobj ={staffId:staff, timeOfServiceIDs:startDate, serviceData:servicedata, payments:payments};
                const result = new JobList(jsonobj);
                await result.save();            
            }
            startDate.setHours(0,0,0,0);
            startDate.setDate(startDate.getDate() + 1);
          }
          res.status(200).json({status:'Ok', message:'Jobs added successfully.'});
        } 
        catch(err){
            res.status(401).json({status:'Failed', message:err.message});
        }
});
module.exports=servicesRouter;