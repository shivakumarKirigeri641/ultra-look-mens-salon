function filterServiceDataByDate(staffdata, day,month, year) {    
    return staffdata.serviceData.filter(item => {      
      const serviceDate = new Date(item.timeOfServiceIDs);
      return (
        serviceDate.getUTCDate() === day &&
        serviceDate.getUTCMonth() === month &&
        serviceDate.getUTCFullYear() === year
      );
    });
  };
  module.exports = filterServiceDataByDate;