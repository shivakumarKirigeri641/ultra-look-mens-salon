const getCountOfServices=(serviceListWithCount0, listidfromsummary)=>{
    for(let i=0;i<serviceListWithCount0.length;i++){
        for(let j=0;j<listidfromsummary.length;j++)
        {
            const temp = listidfromsummary[j].filter(x=>x.toString() === serviceListWithCount0[i]._id.toString());
            if(temp){
                serviceListWithCount0[i].count = serviceListWithCount0[i].count + temp.length;
            }
        }
     }
     return serviceListWithCount0;
};
module.exports=getCountOfServices;