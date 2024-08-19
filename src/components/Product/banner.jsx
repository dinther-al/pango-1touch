import React from "react";
import { useStore } from "zmp-framework/react";
import Skeleton from "react-loading-skeleton";

export default function Banner() {
  const loading = useStore("loading");

  return (
    <div className="z-10">
      {loading ? (
        <Skeleton
          height={100}
          width={370}
          className="flex items-center justify-center ml-[1.2rem] bg-gray-300 rounded"
        />
      ) : (
        <div className="mx-0 relative w-full">
          <div className="relative h-44 overflow-hidden md:h-96">
            <div className="duration-700 ease-in-out">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/pango1touch-a5f78.appspot.com/o/ramadan.jpg?alt=media&token=35f438e6-2edd-44cc-a3b3-47d6e07e19e0"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="banner"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
