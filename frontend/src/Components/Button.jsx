import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#202938] w-full rounded-xl text-white my-3 p-3 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default Button;
