"use client";
import { useUserAuth } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const { userAuth, setUserAuth } = useUserAuth();
  const route = useRouter();
  const handleLogout = async () => {
    try {
      toast.loading("Loggin Out");
      const data = await fetch("/api/users/logout");
      const jData = await data.json();
      toast.dismiss();
      if (jData.statusCode >= 400) {
        toast.error(jData.errors);
      } else {
        setUserAuth({
          id: 0,
          images: "",
          isAdmin: false,
        });
        route.push("/user/login");
        toast.success(jData?.message);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
