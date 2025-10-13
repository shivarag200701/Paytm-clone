const AppBar = () => {
  return (
    <div className="bg-white w-full flex justify-between p-2 shadow-xl">
      <div className="flex justify-center items-center font-semibold">
        PayTm App
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div className="font-semibold">Hello</div>
        <div className="rounded-full w-10 h-10 bg-[#e4eaf2] flex items-center justify-center p-1 font-semibold">
          U
        </div>
      </div>
    </div>
  );
};

export default AppBar;
