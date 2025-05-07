const isDateWithInRange = require("./isDateWithinRange");

const getPayment=(servicedata)=>{
    let totalprice = 0;
    servicedata.forEach(element => {
        totalprice = totalprice + (element.count * element.pricePerService );
    });
    return totalprice;
};
module.exports = getPayment;