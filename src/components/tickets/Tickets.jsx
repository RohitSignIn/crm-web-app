import { useNavigate } from "react-router";

export default function Tickets({
  title,
  quantity,
  fraction,
  totalTickets,
  color1,
  color2,
}) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/tickets/${title}`);
  }

  const perc = parseFloat(fraction * 100).toFixed(1);
  return (
    <section
      title='Open Tickets'
      className={`flex justify-between items-center p-4 text-base-300 min-w-[260px] h-[130px] rounded-md hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer shadow-lg`}
      style={{ background: color1, borderBottom: `0.5rem solid ${color2}` }}
      onClick={handleNavigate}
    >
      <div>
        <label className={`text-[1.4rem] tracking-widest text-black`}>
          {title}
        </label>
        <p className={`text-[2.5rem] font-bold`} style={{ color: color2 }}>
          {quantity}{" "}
          <span className='ml-[-6px] text-[0.7rem]'>/ {totalTickets}</span>
        </p>
      </div>

      {/* Progress Start  */}
      <div
        className={`radial-progress z-0`}
        style={{
          "--value": perc,
          background: color2,
          color: color1,
          border: `0.2rem solid ${color2}`,
        }}
      >
        {perc}%
      </div>
      {/* Progress End  */}
    </section>
  );
}
