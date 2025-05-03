const getExistingDatAndPrice=(servciepricedata)=>{
let array = [];
servciepricedata.map(element => {
    array.push({fromDate:element.fromDate, totDate:element.toDate, price:element.price, count:0})    
});
return array;
};
module.exports = getExistingDatAndPrice;