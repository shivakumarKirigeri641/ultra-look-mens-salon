const isDateWithInRange =(inputDateStr, startDateStr, endDateStr)=>{
    const formatUTC_MMDD = (dateStr) => {
        const d = new Date(dateStr);
        const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // 1–12
        const day = String(d.getUTCDate()).padStart(2, '0');        // 1–31
        return `${month}-${day}`; // e.g. "05-02"
      };
    
      const input = formatUTC_MMDD(inputDateStr);
      const start = formatUTC_MMDD(startDateStr);
      const end = formatUTC_MMDD(endDateStr);
    
      if (start <= end) {
        // Normal range (e.g., Apr 1 to Sep 30)
        return input >= start && input <= end;
      } else {
        // Over year-end (e.g., Nov 1 to Feb 15)
        return input >= start || input <= end;
      }
};
module.exports = isDateWithInRange;