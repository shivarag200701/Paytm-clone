import React from "react";

const InputBox = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col  my-3 justify-start w-full">
      <p className="mb-2 font-semibold">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border-2 border-gray-200 placeholder:text-gray-400 rounded-md"
      />
    </div>
  );
};

export default InputBox;
