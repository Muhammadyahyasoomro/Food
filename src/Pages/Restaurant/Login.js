import React from "react";
import { LoginForm } from "./components/LoginForm";
import { useEffect } from "react";
import { GlobalNavbar } from "../GlobalNavbar";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const Navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email != null) {
      Navigate("/HomeRestaurant");
    }
  });
  return (
    <div>
      <GlobalNavbar />

      <LoginForm />
    </div>
  );
}
