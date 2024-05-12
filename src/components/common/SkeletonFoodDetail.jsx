import React from "react";

export default function SkeletonFoodDetail() {
  const skeletonFoodBaseInformation = (
    <>
      <div className="h-4 w-2/3 bg-gray-300 my-6 rounded-xl"></div>
      <div className="grid sm:grid-cols-2 gap-x-10  grid-cols-1 mt-4 w-full ">
        <div className="h-60 w-full rounded-md  relative rounded-t-lg bg-gray-300 mb-5 mt-2"></div>
        <div className="flex flex-col gap-y-7 mt-4">
          <div>
            <div className=" w-1/3 h-3 rounded-md bg-gray-300"></div>
            <div className=" w-1/2 h-2 rounded-md bg-gray-300 my-3"></div>
          </div>
          <div>
            <div className=" w-2/3 h-3 rounded-md bg-gray-300"></div>
            <div className="flex flex-wrap gap-3">
              <div className=" w-20 h-8 rounded-md bg-gray-300 my-3"></div>
              <div className=" w-20 h-8 rounded-md bg-gray-300 my-3"></div>
              <div className=" w-20 h-8 rounded-md bg-gray-300 my-3"></div>
            </div>
          </div>
          <div>
            <div className=" w-1/3 h-3 rounded-md bg-gray-300" />
            <div className=" w-1/2 h-2 rounded-md bg-gray-300  my-3"></div>
          </div>
        </div>
      </div>
    </>
  );

  const skeletonFoodFacts = (
    <>
      <div className="mb-5 mt-2 border-2 rounded-md p-5 border-gray-300">
        <div className="h-4 w-40 bg-gray-300 rounded-xl mt-2"></div>
        <hr className="border-gray-300 my-4" />
        <div>
          <ul className="flex items-center gap-3 justify-around flex-wrap sm:flex-nowrap ">
            <li className="flex items-center flex-col gap-y-3">
              <div className=" w-12 h-2 rounded-md bg-gray-300"></div>
              <div className=" w-[90px] h-2 rounded-md bg-gray-300"></div>
            </li>
            <li className="flex items-center flex-col gap-y-3">
              <div className=" w-12 h-2 rounded-md bg-gray-300"></div>
              <div className=" w-[70px] h-2 rounded-md bg-gray-300"></div>
            </li>
            <li className="flex items-center flex-col gap-y-3">
              <div className=" w-12 h-2 rounded-md bg-gray-300"></div>
              <div className=" w-[140px] h-2 rounded-md bg-gray-300"></div>
            </li>
            <li className="flex items-center flex-col gap-y-3">
              <div className=" w-12 h-2 rounded-md bg-gray-300"></div>
              <div className=" w-[80px] h-2 rounded-md bg-gray-300"></div>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-4 w-40 bg-gray-300 rounded-xl mt-6 mb-2"></div>
      <hr className="border-gray-300 my-4" />
      <div className="flex flex-col gap-y-4">
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[95%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-9/12 h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
      </div>
    </>
  );

  const skeletonFoodDetailInformation = (
    <div>
      <div className="grid sm:grid-cols-2 mt-5 gap-x-8 grid-cols-1 ">
        <div>
          <div className="h-4 w-40 bg-gray-300 rounded-xl mt-6 mb-2"></div>
          <hr className="border-gray-300 my-4" />
          <div className="flex flex-col gap-y-4">
            <div className=" w-full h-2 rounded-md bg-gray-300"></div>
            <div className=" w-[95%] h-2 rounded-md bg-gray-300"></div>
            <div className=" w-9/12 h-2 rounded-md bg-gray-300"></div>
            <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
            <div className=" w-full h-2 rounded-md bg-gray-300"></div>
            <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
            <div className=" w-full h-2 rounded-md bg-gray-300"></div>
            <div className=" w-full h-52 rounded-md bg-gray-300"></div>
          </div>
          <div className="h-4 w-40 bg-gray-300 rounded-xl mt-6 mb-2"></div>
          <hr className="border-gray-300 my-4" />
          <div className=" w-full h-36 rounded-md bg-gray-300"></div>
        </div>
        <div>
          <div className="h-4 w-40 bg-gray-300 rounded-xl mt-6 mb-2"></div>
          <hr className="border-gray-300 my-4" />
          <div className="w-full bg-gray-300 rounded-full h-9"></div>

          <span className="flex flex-col text-base">
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>

            <div className="flex justify-between border-b-2 py-2 mt-2">
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
              <div className="w-12 h-3 rounded-full bg-gray-300"></div>
            </div>
          </span>
        </div>
      </div>
      <div className="h-4 w-40 bg-gray-300 rounded-xl mt-6 mb-2"></div>
      <hr className="border-gray-300 my-4" />
      <div className="flex flex-col gap-y-4">
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[95%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-9/12 h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
        <div className=" w-full h-2 rounded-md bg-gray-300"></div>
        <div className=" w-[85%] h-2 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
  return (
    <div className="bg-white animate-pulse">
      {skeletonFoodBaseInformation}
      {skeletonFoodFacts} {skeletonFoodDetailInformation}
    </div>
  );
}
