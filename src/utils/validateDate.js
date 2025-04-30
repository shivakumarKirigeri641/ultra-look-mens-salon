const validateDate = (dayInt, monthInt, yearInt)=>{
    // Check if the values are valid numbers
  if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) {
    return res.status(400).send('Invalid date format');
  }

  // Validate day, month, and year ranges
  if (monthInt < 1 || monthInt > 12) {
    throw new Error('Invalid year!')
  }

  if (dayInt < 1 || dayInt > 31) {
    throw new Error('Invalid day!')
  }

  // Handle month-specific days and leap year
  const daysInMonth = new Date(yearInt, monthInt, 0).getDate();
  if (dayInt > daysInMonth) {
    throw new Error('Invalid day for given month!')
  }
};
module.exports = validateDate;