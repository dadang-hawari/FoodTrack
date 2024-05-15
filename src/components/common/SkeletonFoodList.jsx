import React from "react";

export default function SkeletonFoodList({ length }) {
  const skeletonItems = Array.from({ length: length }, (_, index) => (
    <div
      key={index}
      className="max-w-[400px] w-full shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-lg items-center pb-4"
    >
      <div className="h-60 relative rounded-t-lg bg-gray-300 mb-5"></div>
      <div className="w-full">
        <div className="mb-4 mx-auto h-10 w-[80%] flex gap-x-5">
          <div className=" w-full rounded-md bg-gray-300"></div>
          <div className=" w-full rounded-md bg-gray-300"></div>
          <div className=" w-full rounded-md bg-gray-300"></div>
        </div>
        <div className="mb-4 h-3 w-[90%] ml-2 rounded-full bg-gray-300"></div>
        <div className="mb-2 h-2 w-[90%] ml-2 rounded-full bg-gray-300"></div>
        <div className="mb-2 h-2 w-[95%] ml-2 rounded-full bg-gray-300"></div>
        <div className="mb-2 h-2 w-[95%] ml-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  ));
  return (
    <div className="animate-pulse max-w-7xl w-full grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
      {skeletonItems}
    </div>
  );
}
