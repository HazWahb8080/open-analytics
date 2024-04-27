import React from "react";

function Logo({ size }) {
  if (size == "lg") {
    return (
      <h1 className="text-white/80 text-2xl py-10">
        Open{" "}
        <b className="italic font-light font-mono text-[#777777]">Analytics.</b>
      </h1>
    );
  } else {
    return (
      <h4 className="text-white/80 text-md">
        Open{" "}
        <b className="italic font-light font-mono text-[#777777]">Analytics.</b>
      </h4>
    );
  }
}

export default Logo;
