interface DateTabsProps {
  today: Date;
  tomorrow: Date;
  tomorrow2: Date;
}

const DateTabs = ({ today, tomorrow, tomorrow2 }: DateTabsProps) => {
  return (
    <div className="mb-3 flex w-full flex-wrap border-b border-zinc-800 p-4 lg:w-3/5">
      <button className="m-0 w-1/3 border-2 border-r-0 border-black bg-slate-800 bg-gradient-to-b from-slate-600 p-2 text-white">
        {today.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </button>
      <button className=" m-0 w-1/3 border-b-2 border-t-2 border-black bg-green-800 bg-gradient-to-b from-green-700 p-2 text-white">
        {tomorrow.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </button>
      <button className="m-0 w-1/3 border-2 border-l-0 border-black  bg-slate-800 bg-gradient-to-b from-slate-600 p-2  text-white">
        {tomorrow2.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </button>
    </div>
  );
};

export { DateTabs };
