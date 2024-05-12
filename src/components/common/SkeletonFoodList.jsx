import React from "react";

export default function SkeletonFoodList({ length }) {
  const skeletonItems = Array.from({ length: length }, (_, index) => (
    <div
      key={index}
      className="max-w-[400px] w-full shadow-[0_0_2px_1px_rgb(0,0,0,0.3)] rounded-t-lg items-center"
    >
      <div className="h-60 relative rounded-t-lg bg-gray-300 mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-12 w-12 text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <div className="w-full">
        <div className="mb-4 mx-auto h-10 w-[80%] flex gap-x-5">
          <div className=" w-full rounded-md bg-gray-300"></div>
          <div className=" w-full rounded-md bg-gray-300"></div>
          <div className=" w-full rounded-md bg-gray-300"></div>
        </div>
        <div className="mb-4 h-3 w-[90%] ml-2 rounded-full bg-gray-300"></div>
        <div className="mb-2 h-2 w-[90%] ml-2 rounded-full bg-gray-300"></div>
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
