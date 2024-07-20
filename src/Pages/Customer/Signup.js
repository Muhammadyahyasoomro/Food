import React from "react";
import { SignupForm } from "./component/SignupForm";
import { GlobalNavbar } from "../GlobalNavbar";

export default function Signup() {
  return (
    <div>
      <GlobalNavbar />
      <SignupForm />
    </div>
  );
}
