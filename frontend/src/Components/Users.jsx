import { useState } from "react";
import InputBox from "./InputBox";
import Label from "./Label";
import { useEffect, useMemo } from "react";
import axios from "axios";

import Button from "./Button";

const Users = () => {
  const [users, setUsers] = useState([]);

  const token = useMemo(() => {
    const row = document.cookie.split("; ").find((r) => r.startsWith("token="));
    return row ? row.split("=")[1] : null;
  }, []);

  useEffect(() => {
    if (!token) return;
    async function fetchBulkUsers() {
      const res = await axios.get("http://localhost:3001/api/v1/user/bulk", {
        headers: { Authorization: `bearer ${token}` },
      });
      console.log("after");

      const fetchedUsers = res.data.users;
      //   console.log(fetchedUsers);

      const newUsers = fetchedUsers.map((user) => {
        return { firstName: user.firstName, id: user._id };
      });
      //   console.log(newUsers);

      setUsers(newUsers);
    }
    fetchBulkUsers();
  }, [token]);

  function handleClick(id, name) {
    window.location.href = `/send?id=${id}&name=${name}`;
  }
  return (
    <div className="px-8  w-full font-semibold">
      <div>Users</div>
      <div>
        <InputBox placeholder={"Search users....."} />
      </div>
      <ul>
        {users.map((user, index) => (
          <div key={index} className="flex gap-2 pt-1 justify-between   ">
            <div className="flex gap-2 pt-1 items-center justify-center">
              <Label user={user.firstName} color={"[#e4eaf2]"} />
              <div className="flex items-center justify-center text-sm">
                <li>{user.firstName}</li>
              </div>
            </div>
            <div>
              <Button onClick={() => handleClick(user.id, user.firstName)}>
                Send Money
              </Button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Users;
