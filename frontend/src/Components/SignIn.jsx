import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Button from "./Button";
import InputBox from "./InputBox";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center shadow-sm min-h-screen">
      <div className="bg-white w-full max-w-sm rounded-xl p-4">
        <Heading>Sign In</Heading>
        <div className="mt-2 mb-4">
          <SubHeading>Enter your credentials to access your</SubHeading>
          <SubHeading>account</SubHeading>
        </div>
        <InputBox label={"Email"} placeholder={"shiva@gmail"} />
        <InputBox label={"Password"} placeholder={"*****"} />

        <Button>Sign up</Button>
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
