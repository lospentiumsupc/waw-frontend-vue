export const FullMonthMap = [
  "January",
  "February",
  "March",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @param {Date} date
 * @param {boolean} full
 * @returns {string}
 */
export const toLocaleMonth = (date, full) => {
  const month = date.getMonth();
  if (full) {
    return FullMonthMap[month];
  }
  return MonthMap[month];
};
