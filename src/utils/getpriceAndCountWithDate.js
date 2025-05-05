const getExistingDatAndPrice = require('../utils/getExistingDatAndPrice');
const isDateWithInRange = require('../utils/isDateWithinRange');
const getpriceAndCountWithDate=(masterdata, serviceList)=>{
    let arrayOfPriceAndCountWithDate=[];
    //do for 1 element    
    let newlist = serviceList.map(x=>({
        _id:x._id,
        serviceName:x.serviceName,
        pricesAndCountWithDate:{},
        prices:x.prices.map(y=>({fromDate:y.fromDate, toDate:y.toDate, price:y.price, count:0})),
    }));



    //logic to fetch count of each services as summary.
    for(let i=0;i<newlist.length;i++){
        let mycount=0;
        for(let j=0;j<masterdata.length;j++){
            for(let k=0;k<masterdata[j].serviceData.length;k++){
                if(masterdata[j].serviceData[k].serviceID.toString() === newlist[i]._id.toString()){
                    for(let l=0;l<newlist[i].prices.length;l++){
                        if(isDateWithInRange(masterdata[j].timeOfServiceIDs, newlist[i].prices[l].fromDate, newlist[i].prices[l].toDate)){
                            newlist[i].prices[l].count = mycount++;
                        }
                    }
                }
            }
        }
    }


    //filter out only with counts having respective price & date
    newlist.forEach(element => {
        element.prices.filter(x=>{
            if(x.count>0){
                console.log(x);
                //const data = {fromDate:x.fromDate, toDate:x.toDate, price:x.price, count:x.count};
                const data = {price:x.price, count:x.count};
                element.pricesAndCountWithDate = data;
                arrayOfPriceAndCountWithDate.push(element);
            }

            //remove dupilcat attributes
            delete element.prices;
        })
    });
    return arrayOfPriceAndCountWithDate;
};
module.exports = getpriceAndCountWithDate;