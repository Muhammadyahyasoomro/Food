import React from "react";
import { Signup } from "../../Components/Signup";
import { Navbar } from "../../Components/Navbar";
import { AboutRider } from "../../Components/AboutRider";
import { Footer } from "../../Components/Footer";
import { GlobalNavbar } from "../GlobalNavbar";
export const SignupRider = () => {
  return (
    <>
      <GlobalNavbar />
      <Signup />
      <AboutRider />
      <Footer />
    </>
  );
};
