"use client";
import Forms from "@/components/Form";

const Login = () => {
  
  const Props: any = {
    headingName: "Signin User",
    method: "POST",
    apiUrl: `/api/users/login`,
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
