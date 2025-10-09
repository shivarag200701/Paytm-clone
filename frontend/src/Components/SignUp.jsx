import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Button from "./Button";
import InputBox from "./InputBox";

const Signup = () => {
  return (
    <div className="flex justify-center items-center shadow-sm min-h-screen">
      <div className="bg-white w-full max-w-sm rounded-xl p-4">
        <Heading>Sign up</Heading>
        <div className="mt-2 mb-4">
          <SubHeading>Enter your information to create and</SubHeading>
          <SubHeading>account</SubHeading>
        </div>
        <InputBox label={"First Name"} placeholder={"John"} />
        <InputBox label={"Last Name"} placeholder={"Doe"} />
        <InputBox label={"Email"} placeholder={"shiva@gmail"} />
        <InputBox label={"Password"} placeholder={"*****"} />

        <Button>Sign up</Button>
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
