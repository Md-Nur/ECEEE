"use client";
import Forms from "@/components/Form";
import AddEvent from "@/components/admin/AddEvent";
import DeleteButton from "@/components/admin/DeleteButton";
import UpdateCarousel from "@/components/admin/UpdateCarousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const [types, setTypes] = useState<{ id: number; type: string }[]>([
    { id: 0, type: "" },
  ]);
  useEffect(() => {
    fetch("/api/member-type")
      .then((res) => res.json())
      .then((jData) => {
        if (jData.success) {
          setTypes(jData.data);
        } else {
          toast.error(jData.message);
        }
      });
  });
  return (
    <main className="mx-auto my-12">
      <div className="flex w-full pb-14">
        <Link
          href="/admin/unverified-members"
          className="btn btn-success mx-auto"
        >
          Unverified Memebers
        </Link>
      </div>
      <AddEvent />
      <UpdateCarousel />

      {/* Adding member type button */}
      <div className="flex w-full pt-14">
        {types.map((type) => (
          <div key={type.id} className="flex w-auto m-2 p-2">
            <span>{type.type}</span>
            <DeleteButton apiUrl={`/api/member-type?id=${type.id}`} />
          </div>
        ))}
      </div>
      <Forms
        {...{
          headingName: "Add Member type",
          method: "POST",
          apiUrl: "/api/member-type",
          submitName: "Add",
        }}
      >
        <input
          type="text"
          name="member-type"
          placeholder="Member Type"
          className="input input-bordered w-full"
        />
      </Forms>
    </main>
  );
};

export default Admin;
