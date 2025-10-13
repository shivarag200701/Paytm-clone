import { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  console.log("rendered balance");

  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    console.log(cookie);

    async function fetchData() {
      const res = await axios.get(
        "http://localhost:3001/api/v1/account/balance",
        {
          headers: { Authorization: `bearer ${cookie}` },
        }
      );
      console.log("after balacne");

      setBalance(res.data.balance);
    }
    fetchData();
  }, [balance]);
  return (
    <div className="mt-2 p-8  w-full flex font-semibold ">{`Your Balance ${balance}`}</div>
  );
};

export default Balance;
