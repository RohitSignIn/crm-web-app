import { useSelector } from "react-redux";
import Tickets from "./Tickets";
import TicketsTheme from "./TicketsTheme";

export default function TicketsCon() {
  const ticketsTheme = TicketsTheme();
  const ticketCatgData = useSelector((state) => state.tickets.ticketCatg);

  const ticketsArr = Object.keys(ticketsTheme);
  const totalTickets = Object.keys(ticketCatgData).reduce(
    (acc, curr) => acc + ticketCatgData[[curr]],
    0
  );

  return (
    <>
      {/* Tickets Card Start */}
      {ticketCatgData && (
        <section
          id='tickets'
          className='w-full flex justify-center items-start gap-4 flex-wrap'
        >
          {ticketCatgData &&
            ticketsArr.map((type) => {
              return (
                <Tickets
                  key={type}
                  title={type}
                  quantity={ticketCatgData[type]}
                  fraction={ticketCatgData[type] / totalTickets}
                  color1={ticketsTheme[[type]]["color1"]}
                  color2={ticketsTheme[[type]]["color2"]}
                  totalTickets={totalTickets}
                />
              );
            })}
        </section>
      )}
      {/* Tickets Card End */}
    </>
  );
}
