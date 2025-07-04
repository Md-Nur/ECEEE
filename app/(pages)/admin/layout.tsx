"use client";
import Sidebar from "@/components/Sidebar";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../context/userContext";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { userAuth } = useUserAuth();
  const [admin, setAdmin] = useState<boolean>(userAuth?.isAdmin);

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  document.onkeydown = (e) => {
    if (e.key === "123") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "I") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "C") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "J") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == "U") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((jData) => {
        if (jData.statusCode >= 400) router.push("/user/login");
        else return jData.data;
      })
      .then((data) => setAdmin(data?.isAdmin));
  }, [userAuth, router]);
  if (!userAuth)
    return (
      <div className="w-full py-52 flex justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  else if (admin)
    return (
      //
      <main className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow card place-items-center">{children}</div>
        <div className="divider lg:divider-horizontal"></div>
        <aside className="hidden lg:grid flex-grow card place-items-center max-w-xs">
          <Sidebar />
        </aside>
      </main>
    );
  else {
    return (
      <h1 className="text-error text-center text-7xl py-52">
        Only Admins are allowed
      </h1>
    );
  }
};

export default AdminLayout;
