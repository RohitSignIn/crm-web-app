import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TicketsTheme from "../tickets/TicketsTheme";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ filteredData }) {
  const ticketsTheme = TicketsTheme();

  const [chartData, setChartData] = useState();
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    const dataSet = Object.keys(ticketsTheme).map(
      (ticket) => Object.keys(filteredData[[ticket]]).length
    );

    setTotalTickets(dataSet.reduce((acc, item) => acc + item));

    setChartData({
      labels: Object.keys(ticketsTheme),
      datasets: [
        {
          label: " Tickets",
          data: dataSet,
          backgroundColor: Object.keys(ticketsTheme).map(
            (ticket) => ticketsTheme[[ticket]]["color2"]
          ),
          borderColor: Object.keys(ticketsTheme).map(
            (ticket) => ticketsTheme[[ticket]]["color2"]
          ),
          borderWidth: 1,
        },
      ],
    });
  }, [filteredData]);

  return (
    <div className='h-[100%] flex rounded-md justify-center items-center hover:scale-105 transition-all ease-in-out duration-500 dark:border-2 border-primary'>
      <div className='h-[100%] p-8 bg-light dark:bg-dark rounded-md'>
        {chartData && (
          <Doughnut
            data={chartData}
            options={{
              plugins: {
                title: {
                  text: `Total Tickets: ${totalTickets}`,
                  display: true,
                },
                legend: {
                  position: "left",
                  align: "center",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
