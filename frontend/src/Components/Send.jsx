import { useSearchParams } from "react-router-dom";
import Label from "./Label";
import InputBox from "./InputBox";

const Send = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  async function onClick() {}
  return (
    <div className="h-[100vh] flex items-center justify-center ">
      <div className="bg-white rounded-md sm:p-8 p-6 gap-10">
        <div className="text-2xl font-semibold text-center">Send Money</div>
        <div className="mt-10 flex gap-2 justify-start items-center">
          <div>
            <Label user={name} color={"[#23c45f]"} />
          </div>
          <div>{name}</div>
        </div>
        <div className=" sm:min-w-sm  w-full">
          <InputBox label={"Amount (in $)"} placeholder={"Enter amount"} />
        </div>
      </div>
    </div>
  );
};

export default Send;
