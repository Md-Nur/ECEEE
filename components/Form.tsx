"use client";
import { ReactNode, FormEvent, useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userContext";

interface Props {
  children: ReactNode;
  headingName: string;
  method: string;
  apiUrl: string;
  submitName: string;
  // Add any other props here
}

const Forms: React.FC<Props> = ({
  children,
  headingName,
  method,
  apiUrl,
  submitName,
  ...props
}) => {
  const { userAuth, setUserAuth } = useUserAuth();
  const [pending, setPending] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    setPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData) {
      throw Error("There have no form data: " + formData);
    }
    toast.loading("Loading...");
    try {
      const res = await fetch(apiUrl, {
        method: method,
        body: formData,
      });
      const jsonData = await res.json();
      if (res.ok && jsonData.statusCode < 400) {
        const resData = await jsonData?.data;
        toast.dismiss();

        // Router Section
        if (apiUrl.split("/")[2] === "users" && method === "PUT") {
          setUserAuth({
            id: resData?.id,
            images: resData?.images,
            isAdmin: resData?.isAdmin,
          });
          
          router.push(`/user/profile/${resData.id || ""}`);
        } else if (apiUrl.split("/")[2] === "events" && method === "PUT") {
          router.push(`/activities/updated/${apiUrl.split("/")[3]}`);
        } else if (apiUrl === "/api/users/login") {
          setUserAuth({
            id: resData?.id,
            images: resData?.images,
            isAdmin: resData?.isAdmin,
          });
          
          router.push(`/user/profile/${resData.id}`);
        } else if (apiUrl.split("/")[2] === "carousel" && method === "PUT") {
          router.push("/admin");
        }
        toast.success(jsonData.message);
      } else {
        toast.dismiss();
        toast.error(await jsonData.errors);
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message);
    }

    ref.current?.reset();
    setPending(false);
  }

  return (
    <section className="flex flex-col items-center justify-center p-2 sm:p-5 md:p-10">
      <h2 className="text-3xl font-bold">{headingName}</h2>
      <form
        autoComplete="off"
        ref={ref}
        className="flex flex-col items-center justify-center shadow rounded-lg px-5 py-10 md:m-5 w-[80vw] gap-5 bg-neutral"
        method={method}
        onSubmit={onSubmit}
      >
        {children}
        <div className="flex justify-evenly w-full flex-wrap ">
          <button className="btn btn-outline rounded" disabled={pending}>
            <input type="submit" value={submitName || "submit"} />
            {pending && (
              <span className="loading loading-infinity loading-md"></span>
            )}
          </button>
          <input
            type="reset"
            className="btn btn-outline rounded"
            value="Clear"
            disabled={pending}
            onClick={() => {
              ref.current?.reset();
            }}
          />
        </div>
      </form>
    </section>
  );
};

export default Forms;
