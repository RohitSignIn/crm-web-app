function useDateFiltered() {
  return (from, to = new Date(), ticketsList) => {
    // Initial filteredData
    const filteredData = {
      open: {},
      inProgress: {},
      resolved: {},
      onHold: {},
      cancelled: {},
    };

    // Creating filterd Data where all tickets have freq of dates
    ticketsList.forEach((element) => {
      const date = new Date(element.createdAt);
      // const filterDate = new Date();
      // filterDate.setDate(filterDate.getDate() - 7);

      from = new Date(from);
      to = new Date(to);
      if (date > from && date <= to) {
        const key = element.createdAt.split("T")[0];
        if (!filteredData[[element.status]][[key]]) {
          filteredData[[element.status]][[key]] = 1;
        } else {
          filteredData[[element.status]][[key]] += 1;
        }
      }
    });
    return filteredData;
  };
}

export default useDateFiltered;
