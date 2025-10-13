import React from "react";

const Label = ({ user }) => {
  console.log(user);

  return (
    <div className="rounded-full w-10 h-10 bg-[#e4eaf2] flex items-center justify-center p-1 font-semibold">
      {user[0].toUpperCase()}
    </div>
  );
};

export default Label;
