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
          toast.error(jData.errors);
        }
      });
  }, []);

  return (
    <main className="drawer lg:drawer-open">
      <section className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
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
        <h2 className="text-4xl text-center mt-14 font-bold">Member Types</h2>
        {types[0].id > 0 ? (
          <ol className="flex w-full justify-center">
            {types.map((type) => (
              <li
                key={type.id}
                className="flex gap-2 w-auto m-2 p-2 items-center bg-accent rounded-lg text-accent-content"
              >
                <span>{type.type}</span>

                <label htmlFor="dlt-mem"></label>
                <DeleteButton apiUrl={`/api/member-type?id=${type.id}`} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-center text-error text-xl">
            There have no member type
          </p>
        )}
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
      </section>
      <aside className="bg-base-100 w-80 overflow-scroll sticky top-14 bottom-0">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </aside>
    </main>
    // <main className="mx-auto my-12">

    // </main>
  );
};

export default Admin;
