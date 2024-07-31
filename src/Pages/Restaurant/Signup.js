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
     
      <SignupForm />
      <WhyJoinBig />
    </div>
  );
}
