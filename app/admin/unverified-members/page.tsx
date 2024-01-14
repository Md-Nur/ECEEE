"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../context/userContext";
import Member, { User } from "@/components/Member";

const Unverified = () => {
  const { userAuth } = useUserAuth();
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((jData) => jData.reverse())
      .then((data) => setUsers(data));
  }, [userAuth]);

  if (!users)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <main className="mx-auto max-w-[95vw] lg:max-w-[80vw] my-12">
      <h1 className="text-center text-4xl font-bold mb-5">
        Unverified Members
      </h1>
      {users.map((user) => !user?.isVerified && <Member {...user} />)}
    </main>
  );
};

export default Unverified;
