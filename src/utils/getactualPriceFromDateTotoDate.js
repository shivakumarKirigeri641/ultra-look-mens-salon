const isDateWithInRange = require('../utils/isDateWithinRange');
const getactualPriceFromDateTotoDate = (jobId, timeOfServiceIDs, servicelist, combolist)=>{
    let actualprice = 0;
    let fromDate = new Date();
    let toDate = new Date();
    //get price form servicelist if jobId exists
    let isidfound=false;
    for(let j=0;j<servicelist.length;j++){
        if(servicelist[j]._id.toString() === jobId.toString()){
            isidfound=true;
            for(let k=0;k<servicelist[j].prices.length;k++){
                if(isDateWithInRange(timeOfServiceIDs, servicelist[j].prices[k].fromDate, servicelist[j].prices[k].toDate)){                    
                    actualprice = servicelist[j].prices[k].price;
                    fromDate = servicelist[j].prices[k].fromDate;
                    toDate = servicelist[j].prices[k].toDate;
                    break;
                }
            }
            break;
        }
    }

    if(false === isidfound){
        let subtotal=0;
        let discount=0;
        for(let l=0;l<combolist.length;l++){
            discount = combolist[l].discount;
            if(combolist[l]._id.toString() === jobId.toString())
            {
                for(let m = 0;m<combolist[l].combos.length;m++){
                    for(let j=0;j<servicelist.length;j++){
                        if(servicelist[j]._id.toString() === combolist[l].combos[m].serviceID.toString()){
                            isidfound=true;
                            for(let k=0;k<servicelist[j].prices.length;k++){
                                if(isDateWithInRange(timeOfServiceIDs, servicelist[j].prices[k].fromDate, servicelist[j].prices[k].toDate)){
                                    actualprice =actualprice + servicelist[j].prices[k].price;
                                    fromDate = servicelist[j].prices[k].fromDate;
                                    toDate = servicelist[j].prices[k].toDate;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                break;
            }
        }
    }
    return {actualprice, fromDate, toDate};
};
module.exports= getactualPriceFromDateTotoDate;