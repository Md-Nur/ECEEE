"use client";
import { useState } from "react";
import Forms from "@/components/Form";

function passwordGenerator() {
  const allChar =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let pass = "";
  for (let i = 0; i < 5; i++) {
    let oneChar = allChar[Math.floor(Math.random() * allChar.length)];
    pass += oneChar;
  }
  return pass;
}

const Singin = () => {
  const Props: any = {
    headingName: "Signin User",
    method: "POST",
    apiUrl: `/api/users/signin`,
    submitName: "Signin",
  };
  const [password, setPassword] = useState(passwordGenerator());
  return (
    <Forms {...Props}>
      <input
        type="text"
        placeholder="Full Name"
        name="fullname"
        className="input input-bordered w-full"
      />

      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input input-bordered w-full"
      />
      {/* <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden sm:inline text-xs md:text-lg">Images: </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10"
          accept="image/png, image/jpeg"
          required
          id="img"
          multiple
        />
      </label> */}
      <input
        type="tel"
        placeholder="Phone Number"
        required
        name="phone"
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        className="input input-bordered w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Forms>
  );
};

export default Singin;
