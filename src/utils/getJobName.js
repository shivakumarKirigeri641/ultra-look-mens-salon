const getJobName=(jobId, servicelist, combolist)=>{
    let name='';
    let result = servicelist.filter(x=>x._id.toString() === jobId.toString());
    if(0 < result.length){
        name = result[0].serviceName;
    }
    else{
        result = combolist.filter(x=>x._id.toString() === jobId.toString());        
        if(0 < result.length){
            name = result[0].comboName;
        }
    }
    return name;
};
module.exports= getJobName;