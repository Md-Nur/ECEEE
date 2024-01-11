"use client";
import Forms from "@/components/Form";
import { useEffect, useState } from "react";
import { User } from "@/app/user/profile/[id]/page";

const UpdateUser = ({ params }: { params: { id: string } }) => {
  const Props: any = {
    headingName: "Update User Infromation",
    method: "PUT",
    apiUrl: `/api/users/${params.id}`,
    submitName: "Update User",
  };
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata.statusCode >= 400) setError(jdata);
        return jdata;
      })
      .then((data) => setUser(data));
    //   .catch((err) => setError(err));
  }, [params.id]);

  if (error)
    return (
      <div className="text-center text-error text-5xl py-52">
        {error?.errors}
      </div>
    );

  if (!user)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className=" loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <Forms {...Props}>
      <input
        type="text"
        placeholder="Full Name"
        name="fullname"
        className="input input-bordered w-full"
        value={user?.fullname}
        onChange={(e) => setUser({ ...user, fullname: e.target.value })}
      />
      <input
        type="text"
        className="textarea textarea-bordered w-full"
        name="phone"
        placeholder="Phone Number"
        value={user?.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <input
        type="password"
        className="textarea textarea-bordered w-full"
        name="password"
        placeholder="Password (If you don't want to change password then remain this field blank"
      />

      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden md:inline text-xs">
          Images: (If you don&apos;t want to update image remain this field
          blank){" "}
        </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10"
          accept="image/png, image/jpeg"
          id="img"
        />
      </label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="input input-bordered w-full"
        value={user?.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
    </Forms>
  );
};

export default UpdateUser;
