import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-[#202938] w-full rounded-xl text-white my-3 p-3">
      {children}
    </button>
  );
};

export default Button;
