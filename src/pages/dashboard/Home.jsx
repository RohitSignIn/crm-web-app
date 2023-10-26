import DashboardLayout from "../../layout/DashboardLayout";
import TicketsCon from "../../components/tickets/TicketsCon";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import { useEffect, useState } from "react";
import useDateFiltered from "../../hooks/useDateFiltered";
import { useSelector } from "react-redux";

export default function Home() {
  const ticketsList = useSelector((state) => state.tickets.ticketList);

  // Filter shows Previous 7 days Data By Default
  let defaultFilter = new Date().setDate(new Date().getDate() - 7);
  defaultFilter = new Date(defaultFilter);

  const [dateBetw, setDateBetw] = useState({
    from: defaultFilter.toISOString().substring(0, 10),
    to: new Date().toISOString().substring(0, 10),
  });

  // Custom Hook to get filtered Data of all tickets according to date
  const DateFiltered = useDateFiltered();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(DateFiltered(dateBetw.from, dateBetw.to, ticketsList));
  }, [dateBetw, ticketsList]);

  // Handle Date Input Change
  function handleInputDate(e) {
    setDateBetw({ ...dateBetw, [e.target.name]: e.target.value });
  }

  return (
    <DashboardLayout>
      <TicketsCon />
      {filteredData && (
        <div className='flex max-w-full h-[25rem] justify-center items-center gap-8 mt-8 cursor-pointer'>
          <LineChart
            dateBetw={dateBetw}
            filteredData={filteredData}
            handleInputDate={handleInputDate}
          />
          <DoughnutChart filteredData={filteredData} />
        </div>
      )}
    </DashboardLayout>
  );
}
