"use client";
import { useState } from "react";
import Forms from "@/components/Form";

const Singin = () => {
  const Props: any = {
    headingName: "Signin User",
    method: "POST",
    apiUrl: `/api/users/signin`,
    submitName: "Signin",
  };
  return (
    <Forms {...Props}>
      <input
        type="text"
        placeholder="Name"
        name="fullname"
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        placeholder="Roll No"
        name="rollNo"
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Session"
        name="session"
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        placeholder="Year"
        name="year"
        className="input input-bordered w-full"
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        required
        name="phone"
        className="input input-bordered w-full"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Interests"
        name="interests"
        className="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="input input-bordered w-full"
        required
      />
      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden sm:inline text-xs md:text-lg">Avatar: </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10 file-input-success"
          accept="image/png, image/jpeg"
          id="img"
        />
      </label>
    </Forms>
  );
};

export default Singin;
