import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Button from "./Button";
import InputBox from "./InputBox";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/signup", {
        username: email,
        firstName,
        lastName,
        password,
      });
      const data = res.data;

      if (res) {
        console.log(res.token);
        document.cookie = `token=${data.token}; path=/`;

        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("error while posting sigup credentials:", error);
    }
  }
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(password);

  return (
    <div className="flex justify-center items-center shadow-sm min-h-screen">
      <div className="bg-white w-full max-w-sm rounded-xl p-4">
        <Heading>Sign up</Heading>
        <div className="mt-2 mb-4">
          <SubHeading>Enter your information to create and</SubHeading>
          <SubHeading>account</SubHeading>
        </div>
        <InputBox
          label={"First Name"}
          placeholder={"John"}
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        <InputBox
          label={"Last Name"}
          placeholder={"Doe"}
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        <InputBox
          label={"Email"}
          placeholder={"shiva@gmail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label={"Password"}
          placeholder={"*****"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleClick} className="cursor-pointer">
          Sign up
        </Button>
        <div className="flex justify-center gap-1">
          <p className="">Already have an account? </p>
          <a href="/signin" className="underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
