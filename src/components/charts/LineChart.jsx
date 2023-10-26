import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TicketsTheme from "../../components/tickets/TicketsTheme";
import useDateArray from "../../hooks/useDateArray";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ dateBetw, filteredData, handleInputDate }) {
  const ticketsTheme = TicketsTheme();

  // Getting Date array according to filter for labels
  const labels = useDateArray(dateBetw.from, dateBetw.to);

  // Populating labels and filteredData(that has all tickets freq according to date) in chart Data
  const ticketsArr = Object.keys(ticketsTheme);
  const chartData = {
    labels: labels.map((date) => {
      const dateObj = new Date(date);
      return (
        dateObj.getDate() +
        " " +
        dateObj.toLocaleString("default", { month: "short" })
      );
    }),
    datasets: ticketsArr.map((ticket, idx) => {
      return {
        label: ticket,
        data: labels.map((date) =>
          filteredData[[ticket]][[date]] ? filteredData[[ticket]][[date]] : 0
        ),
        backgroundColor: [ticketsTheme[[ticket]]["color2"]],
        borderColor: ticketsTheme[[ticket]]["color2"],
        borderWidth: 4,
        hidden: idx != 0 ? true : false,
      };
    }),
  };

  return (
    <div className='h-[100%] bg-light dark:bg-dark rounded-md hover:scale-105 transition-all ease-in-out duration-500 dark:border-2 border-primary'>
      <div className='h-[100%] w-full flex flex-col justify-center items-end'>
        <div className='relative max-w-max min-w-[40rem] h-[100%] p-4'>
          {/* Line Chart Start  */}
          <Line
            data={chartData}
            options={{
              scale: {
                ticks: {
                  precision: 0,
                },
              },
              plugins: {
                title: {
                  display: true,
                },
                legend: {
                  position: "left",
                  align: "center",
                },
              },
            }}
          />
          {/* Line Chart End  */}
        </div>

        {/* Filter By Date UI */}
        <div className='bg-light dark:bg-dark flex w-full justify-center border-t-2 border-primary p-2 gap-6 items-center rounded-b-md'>
          <div>
            <label htmlFor=''>From,&nbsp;&nbsp;</label>
            <input
              name='from'
              type='date'
              value={dateBetw.from}
              onChange={handleInputDate}
              className='bg-transparent cursor-pointer'
            />
          </div>
          <div>
            <label htmlFor=''>To,&nbsp;&nbsp;</label>
            <input
              name='to'
              type='date'
              value={dateBetw.to}
              onChange={handleInputDate}
              className='bg-transparent cursor-pointer'
            />
          </div>
        </div>
        {/* Filter By Date UI */}
      </div>
    </div>
  );
}
