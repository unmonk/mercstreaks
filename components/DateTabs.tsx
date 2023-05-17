interface DateTabsProps {
  today: String;
  tomorrow: String;
  yesterday: String;
}

export default function DateTabs({
  today,
  tomorrow,
  yesterday,
}: DateTabsProps) {
  return (
    <div className="mb-3 flex w-full flex-wrap border-b border-zinc-800 p-4 lg:w-3/5">
      <button className="m-0 w-1/3 border-2 border-r-0 border-black bg-slate-800 bg-gradient-to-b from-slate-600 p-2 text-white">
        {yesterday}
      </button>
      <button className=" m-0 w-1/3 border-b-2 border-t-2 border-black bg-green-800 bg-gradient-to-b from-green-700 p-2 text-white">
        {today}
      </button>
      <button className=" m-0 w-1/3 border-2 border-l-0 border-black bg-slate-800 bg-gradient-to-b from-slate-600 p-2  text-white">
        {tomorrow}
      </button>
    </div>
  );
}
