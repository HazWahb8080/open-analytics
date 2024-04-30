"use client";
import React from "react";

function Wrapper({ children }) {
  return (
    <div
      className="bg-black min-h-screen h-full w-full
     relative items-center justify-center flex flex-col"
    >
      <div className="absolute z-0 grid grid-cols-2 h-full min-h-screen w-full place-items-center">
        <div className="w-[1px] bg-white/5 min-h-screen h-full " />
        <div className="w-[1px] bg-white/5 min-h-screen h-full " />
      </div>
      {children}
    </div>
  );
}

export default Wrapper;
