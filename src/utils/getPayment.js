const isDateWithInRange = require("./isDateWithinRange");

const getPayment=(servicedata, timeOfServiceIDs, servicelist, combolist)=>{
    let totalprice = 0;
    for(let i=0;i<servicedata.length;i++){
        let isidfound=false;        
        const jobid = servicedata[i].jobID;
        const count =servicedata[i].count;

        //get price form servicelist if jobid exists
        for(let j=0;j<servicelist.length;j++){
            if(servicelist[j]._id.toString() === jobid.toString()){
                isidfound=true;
                for(let k=0;k<servicelist[j].prices.length;k++){
                    if(isDateWithInRange(timeOfServiceIDs, servicelist[j].prices[k].fromDate, servicelist[j].prices[k].toDate)){
                        totalprice =totalprice +(servicelist[j].prices[k].price * count);
                        break;
                    }
                }
                break;
            }
        }



        //now check in comboid if not available in servicelist
        if(false === isidfound){
            let subtotal=0;
            let discount=0;
            for(let l=0;l<combolist.length;l++){
                discount = combolist[l].discount;
                if(combolist[l]._id.toString() === jobid.toString())
                {
                    for(let m = 0;m<combolist[l].combos.length;m++){
                        for(let j=0;j<servicelist.length;j++){
                            if(servicelist[j]._id.toString() === combolist[l].combos[m].serviceID.toString()){
                                isidfound=true;
                                for(let k=0;k<servicelist[j].prices.length;k++){
                                    if(isDateWithInRange(timeOfServiceIDs, servicelist[j].prices[k].fromDate, servicelist[j].prices[k].toDate)){
                                        subtotal =subtotal + servicelist[j].prices[k].price;
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
            totalprice = subtotal;
            totalprice = totalprice - (totalprice*discount/100);
        }
    }
    return totalprice;
};
module.exports = getPayment;