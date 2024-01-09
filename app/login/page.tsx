"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axois";
import Link from "next/link";
import Forms from "@/components/Form";

const Login = () => {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });
  const Props: any = {
    headingName: "Signin User",
    method: "POST",
    apiUrl: `/api/login`,
    submitName: "Login",
  };
  return (
    <Forms {...Props}>
      <input
        type="tel"
        placeholder="Phone Number"
        name="phone"
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        className="input input-bordered w-full"
        required
      />
    </Forms>
  );
};

export default Login;
