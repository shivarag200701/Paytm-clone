import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Button from "./Button";
import InputBox from "./InputBox";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick() {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/signin", {
        username: email,
        password,
      });
      const data = res.data;
      console.log(res);

      if (res) {
        document.cookie = `token=${data.token}; path=/`;

        window.location.href = "/dashboard";
        console.log(res);
      }
    } catch (error) {
      console.error("error while posting sigin credentials:", error);
    }
  }
  return (
    <div className="flex justify-center items-center shadow-sm min-h-screen">
      <div className="bg-white w-full max-w-sm rounded-xl p-4">
        <Heading>Sign In</Heading>
        <div className="mt-2 mb-4">
          <SubHeading>Enter your credentials to access your</SubHeading>
          <SubHeading>account</SubHeading>
        </div>
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

        <Button onClick={handleClick}>Sign up</Button>
        <div className="flex justify-center gap-1">
          <p className="">Don&apos;t have an account? </p>
          <a href="/signup" className="underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
