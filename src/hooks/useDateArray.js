function useDateArray(startDate, endDate) {
  // start date
  startDate = new Date(startDate);
  // end date
  endDate = new Date(endDate);

  // array of dates
  const datesArray = [];

  // loop from start date to end date
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesArray.push(date.toISOString().split("T")[0]);
  }

  return datesArray;
}

export default useDateArray;
