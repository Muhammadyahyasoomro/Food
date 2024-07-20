import React from "react";
import { GlobalNavbar } from "../GlobalNavbar";
import { SignupForm } from "./components/SignupForm";
import { WhyJoinBig } from "./components/WhyJoinBig";

export default function Signup() {
  return (
    <div>
      <GlobalNavbar />
      <br />
      <br />
      <br />
      <h4 style={{ color: "red" }} className="text-center text-capitalize">
        Register to get started your Journey as a BigChef
      </h4>
      <SignupForm />
      <WhyJoinBig />
    </div>
  );
}
