"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUserAuth } from "../context/userContext";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { userAuth } = useUserAuth();
  const [admin, setAdmin] = useState<any>(userAuth.isAdmim);

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((jData) => {
        if (jData.statusCode >= 400) router.push("/user/login");
        else return jData.data;
      })
      .then((data) => setAdmin(data));
  }, [userAuth, router]);
  if (!admin)
    return (
      <div className="w-full py-52 flex justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  else if (admin?.isAdmim) return <>{children}</>;
  else {
    return (
      <h1 className="text-error text-center text-7xl py-52">
        Only Admins are allowed
      </h1>
    );
  }
};

export default AdminLayout;
