"use client";
import { User } from "@/components/Member";
import Forms from "@/components/Form";
import { useEffect, useState } from "react";

const UpdateAdmin = ({ params }: { params: { id: string } }) => {
  const Props: any = {
    headingName: "Update Admin",
    method: "PUT",
    apiUrl: `/api/users/${params.id}/update-admin`,
    submitName: "Update",
  };
  const [user, setUser] = useState<User>();
  const [membershipTypesOption, setMembershipTypesOption] = useState<
    { id: number; type: string }[]
  >([
    {
      id: 0,
      type: "",
    },
  ]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    fetch(`/api/users/${params.id}/`)
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata.statusCode >= 400) setError(jdata);
        else setUser(jdata.data);
      });

    fetch("/api/member-types")
      .then((res) => res.json())
      .then((jdata) => {
        jdata.success ? setMembershipTypesOption(jdata.data) : setError(jdata);
      });
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
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  return (
    <Forms {...Props}>
      <input
        type="text"
        placeholder="Full Name"
        name="fullname"
        className="input input-bordered w-full"
        value={`Full Name: ${user?.fullname}`}
        disabled
      />
      <label
        htmlFor="isVerified"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Verification:
        <select
          name="isVerified"
          id="isVerified"
          className="select select-bordered w-full max-w-sm"
        >
          <option selected>
            {user.isVerified ? "Verified" : "Not Verified"}
          </option>
          <option>{user.isVerified ? "Not Verified" : "Verified"}</option>
        </select>
      </label>
      <label
        htmlFor="isAdmin"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Position:
        <select
          id="isAdmin"
          name="isAdmin"
          className="select select-bordered w-full max-w-sm"
        >
          <option selected>{user.isAdmin ? "Admin" : "Not Admin"}</option>
          <option>{user.isAdmin ? "Not Admin" : "Admin"}</option>
        </select>
      </label>
      <label
        htmlFor="membershipFee"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Membership Fee:
        <input
          className="input input-bordered w-full max-w-sm"
          type="number"
          name="membershipFee"
          value={user?.membershipFee}
          onChange={(e) =>
            setUser({ ...user, membershipFee: Number(e.target.value) })
          }
        />
      </label>
      <label
        htmlFor="membershipValidity"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Membershipt Validiy
        <input
          type="date"
          className="input input-bordered w-full max-w-sm"
          name="membershipValidity"
          placeholder="dd-mm-yyyy"
          value={user.membershipValidity}
          onChange={(e) =>
            setUser({
              ...user,
              membershipValidity: e.target.value,
            })
          }
        />
      </label>
      <label
        htmlFor="membershipType"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Membership Type:
        <select
          id="membershipType"
          name="membershipType"
          className="select select-bordered w-full max-w-sm"
        >
          <option selected>{user.membershipType}</option>
          {membershipTypesOption!.map(
            (type) =>
              type.type !== user.membershipType && (
                <option key={type.id}>{type.type}</option>
              )
          )}
        </select>
      </label>
      <label
        htmlFor="memberId"
        className="flex flex-wrap items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        Member Id
        <input
          type="number"
          placeholder="Member Id"
          name="memberId"
          className="input input-bordered w-full max-w-sm"
          value={user?.memberId}
          onChange={(e) =>
            setUser({ ...user, memberId: Number(e.target.value) })
          }
        />
      </label>
    </Forms>
  );
};

export default UpdateAdmin;
