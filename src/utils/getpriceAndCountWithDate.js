const getExistingDatAndPrice = require('../utils/getExistingDatAndPrice');
const isDateWithInRange = require('../utils/isDateWithinRange');
const getpriceAndCountWithDate=(masterdata, serviceList)=>{
    let arrayOfPriceAndCountWithDate=[];
    //do for 1 element    
    let newlist = serviceList.map(x=>({
        _id:x._id,
        serviceName:x.serviceName,
        prices:x.prices.map(y=>({fromDate:y.fromDate, toDate:y.toDate, price:y.price, count:0})),
    }));


    console.log(newlist);
    newlist.forEach(x => {
        masterdata.forEach(y => {
            if(y.serviceData.includes(x._id)){
                //now check the date is in between the prices date? than take the price;
                x.prices.forEach(z => {
                    if(isDateWithInRange(y.timeOfServiceIDs, z.fromDate, z.toDate)){
                        z.count = z.count+1;
                    }
                    else{
                    }
                });
            }
        });
    });

    //store if count>0
    newlist.forEach(x => {
        x.prices = x.prices.filter(y=>y.count>0);
        arrayOfPriceAndCountWithDate.push(x);
    });
    return newlist;
};
module.exports = getpriceAndCountWithDate;