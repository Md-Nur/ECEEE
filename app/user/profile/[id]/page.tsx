"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  image: string;
}

const Profile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata.statusCode >= 400) setError(jdata);
        return jdata;
      })
      .then((data) => setUser(data));
  }, [params.id, error]);
  if (!user)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-error text-5xl py-52">
        {error?.errors}
      </div>
    );
  return (
    <main className="hero py-16 bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          alt={user.fullname}
          src={user?.images}
          height={400}
          width={400}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{user.fullname}</h1>
          <p className="pt-6">Phone: {user.phone}</p>
          <p className="pb-6">Email: {user.email}</p>
          <Link href={`/user/update/${user.id}`} className="btn btn-primary">
            Update
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
