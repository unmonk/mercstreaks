import React, { useState } from "react";

interface EventboxProps {
  homeTeam: string;
  awayTeam: string;
  startTime: Date;
  endTime?: Date;
  id: string;
}

const Eventbox = (props: EventboxProps) => {
  const [away, setAway] = useState(false);
  const [home, setHome] = useState(false);
  const [pick, setPick] = useState("");
  //setPick api.picks.create

  const handlePick = (team: string) => {
    if (team === "away") {
      setAway((prevState) => !prevState);
    }
    if (team === "home") {
      setHome((prevState) => !prevState);
    }
    setPick((prevState) => (prevState === team ? "" : team));
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <input
          className="h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={home}
          disabled={pick === "away"}
          type="checkbox"
          onChange={() => handlePick("home")}
        />
        <div>
          <div className="text-lg font-semibold">{props.homeTeam}</div>
          <div className="text-xs text-gray-500">W8 - L0</div>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="my-2 text-sm">{props.startTime.toLocaleString()}</div>
          <div className="text-xs">
            Projected Finish: {props.endTime?.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">{props.awayTeam}</div>
          <div className="text-xs text-gray-500">W7 - L1</div>
        </div>
        <input
          className="h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={away}
          disabled={pick === "home"}
          type="checkbox"
          onChange={() => handlePick("away")}
        />
      </div>
    </div>
  );
};

export { Eventbox };
