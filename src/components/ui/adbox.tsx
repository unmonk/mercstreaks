import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";

interface AdboxProps {
  name: string;
}

const Adbox = (props: AdboxProps) => {
  const { userId } = useAuth();
  console.log(userId);

  return (
    <div
      className={`flex w-5/6 flex-col gap-4 rounded-lg bg-gray-400 p-2 shadow-md dark:bg-gray-700`}
    >
      <div className="mx-1 flex items-center justify-between rounded-lg bg-gray-400 dark:bg-gray-700">
        <h3 className="text-md font-semibold">Advertiser Name</h3>
        <span className="text-sm text-gray-600">N/A</span>
      </div>
      <div className=" rounded-lg bg-slate-50 p-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">Ad Description</p>
        </div>
      </div>
    </div>
  );
};

export { Adbox };
