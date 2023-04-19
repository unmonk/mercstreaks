interface AdboxProps {
  name: string;
}

const Adbox = (props: AdboxProps) => {
  return (
    <div
      className={`flex w-5/6 flex-col gap-4 rounded-lg bg-gray-400 p-2 shadow-md dark:bg-gray-700 lg:w-2/5`}
    >
      <div className="mx-1 flex items-center justify-between rounded-lg bg-gray-400 dark:bg-gray-700">
        <h3 className="text-md font-semibold">{props.name ?? "Ad"}</h3>
        <span className="text-sm text-gray-600">N/A</span>
      </div>
      <div className=" rounded-lg bg-slate-50 p-2">
        <div className="mb-2 flex items-center justify-start gap-2 ">
          <img
            className="mr-2 aspect-square h-20  w-20 rounded-lg bg-slate-300 bg-gradient-to-t from-slate-200 p-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/1200px-Best_Buy_Logo.svg.png"
          ></img>
          <p className="justify-end text-sm text-gray-600">
            Buy something, long text test long text test long text test long
            text test long text test long text test long text test long text
            test
          </p>
        </div>
        <div className="flex items-center justify-between text-center">
          <span className="text-md font-semibold text-black"></span>
          <a href="#" className="text-green-800 underline">
            Visit Ad
          </a>
          <span className="text-md font-semibold text-black"></span>
        </div>
      </div>
    </div>
  );
};

export { Adbox };
