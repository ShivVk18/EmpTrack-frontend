import React from "react";

const Spinner = ({
  size = "44px",
  color = "border-blue-500",
  label = "",
  thickness = "border-4",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`rounded-full ${thickness} ${color} border-t-transparent animate-spin`}
        style={{
          width: size,
          height: size,
          borderTopColor: "transparent",
        }}
      />
      {label && <p className="text-sm text-slate-500">{label}</p>}
    </div>
  );
};

export default Spinner;