import { useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import Label from "./Label";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

const Send = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("Initiate Transfer");
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const token = useMemo(() => {
    const row = document.cookie.split("; ").find((r) => r.startsWith("token="));
    return row ? row.split("=")[1] : null;
  }, []);

  async function handleClick() {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      const message = res.data.message;
      console.log("response", res);

      setStatus(message);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setStatus(err.response.data.message);
        console.error(err.response.data.message);
      } else {
        setStatus("Something went wrong");
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Initiate Transfer");
    }, [5000]);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);
  return (
    <div className="h-[100vh] flex items-center justify-center ">
      <div className="bg-white rounded-md sm:p-8 p-6 gap-10 shadow-2xl">
        <div className="text-3xl font-bold text-center">Send Money</div>
        <div className="mt-10 flex gap-2 justify-start items-center">
          <div>
            <Label user={name} color={"#23c45f"} />
          </div>
          <div className="text-2xl font-semibold">{name}</div>
        </div>
        <div className=" sm:min-w-sm  w-full">
          <InputBox
            label={"Amount (in $)"}
            placeholder={"Enter amount"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button color={"#23c45f"} onClick={handleClick}>
          {status}
        </Button>
      </div>
    </div>
  );
};

export default Send;
