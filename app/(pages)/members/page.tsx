"use client";
import { useEffect, useState } from "react";
import { useUserAuth } from "@/app/context/userContext";
import Member, { User } from "@/components/Member";
import toast from "react-hot-toast";

const UserList = () => {
  const { userAuth } = useUserAuth();
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    fetch("/api/users/verified-members")
      .then((res) => res.json())
      .then((jData) => {
        if (jData.success) {
          setUsers(jData?.data?.reverse());
        } else toast.error(jData.errors);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [userAuth]);

  if (!users || users?.length === 0)
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
        There have no member
      </div>
    );

  return (
    <section className="mx-auto max-w-[95vw] lg:max-w-[80vw] py-12">
      <h1 className="text-center text-4xl font-bold mb-5">Members</h1>
      {users?.map(
        (user) =>
          !user?.isAdmin &&
          user?.isVerified && <Member key={user.id} {...user} />
      )}
    </section>
  );
};

export default UserList;
