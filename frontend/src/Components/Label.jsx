import React from "react";

const Label = ({ user, color }) => {
  console.log(color);

  return (
    <div
      className="rounded-full w-10 h-10 flex items-center justify-center p-1 font-semibold text-black"
      style={{ backgroundColor: color }}
    >
      {user[0].toUpperCase()}
    </div>
  );
};

export default Label;
