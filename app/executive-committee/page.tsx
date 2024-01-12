"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/ru-logo.png";

interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  images: string;
  isAdmin: boolean;
}
const Admin = () => {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    fetch("api/users")
      .then((res) => res.json())
      .then((jData) => jData.reverse())
      .then((data) => setUsers(data));
  }, [users]);

  if (!users)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <main className="mx-auto max-w-[95vw] lg:max-w-[80vw] my-12">
      <h1 className="text-center text-4xl font-bold mb-5">
        Executive Committee
      </h1>
      {users.map(
        (user) =>
          user.isAdmin && (
            <section
              key={user.id}
              className="collapse collapse-plus bg-base-200 mx-auto my-3"
            >
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                <div className="collapse-title">
                  <div className="flex items-center flex-col md:flex-row">
                    <div className="avatar">
                      <div className="w-14 mask mask-squircle">
                        <Image
                          alt={user.fullname}
                          fill
                          src={user.images || logo}
                        />
                      </div>
                    </div>
                    <p className="md:text-xl font-medium mx-5">
                      {user.fullname ? user.fullname : user.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="collapse-content text-xs sm:text-base">
                <p className="mx-3">Phone: {user.phone}</p>
                <p className="mx-3">Email: {user.email}</p>
                <p className="mx-3">Id: {user.id}</p>
                <div className="m-2">
                  <Link
                    href={`/user/profile/${user.id}`}
                    className="btn btn-primary mx-1"
                  >
                    Veiew Profile
                  </Link>
                  <Link
                    href={`/user/update/${user.id}`}
                    className="btn btn-info mx-1"
                  >
                    Update Profile
                  </Link>
                </div>
              </div>
            </section>
          )
      )}
    </main>
  );
};

export default Admin;
