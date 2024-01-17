"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "../context/userContext";
import Member, { User } from "@/components/Member";
import toast from "react-hot-toast";

const UserList = () => {
  const { userAuth } = useUserAuth();
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    fetch("/api/users/verified-members", { cache: "no-store" })
      .then((res) => res.json())
      .then((jData) => {
        if (jData.success) return jData.data;
        else toast.error(jData.errors);
      })
      .then((data) => data.reverse())
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
      <h1 className="text-center text-4xl font-bold mb-5">Members</h1>
      {users.map(
        (user) =>
          !user?.isAdmin &&
          user?.isVerified && <Member key={user.id} {...user} />
      )}
    </main>
  );
};

export default UserList;
