const isDateWithInRange = require("./isDateWithinRange");

const getTotalFromListOfServices=(serviceidlist, fromDate, servicelist)=>{
let totalamount=0;
for(let i =0;i<serviceidlist.length;i++){
    for(let j =0;j<servicelist.length;j++){
            if(serviceidlist[i].serviceID.toString() === servicelist[j]._id.toString())
            {                
                for(let k=0;k<servicelist[j].prices.length;k++){                    
                    if(isDateWithInRange(fromDate, servicelist[j].prices[k].fromDate, servicelist[j].prices[k].toDate))
                    {
                        totalamount = totalamount+servicelist[j].prices[k].price;
                        break;
                    }
                }
                break;
            }    
        }
    }
    return totalamount;
};
module.exports= getTotalFromListOfServices;