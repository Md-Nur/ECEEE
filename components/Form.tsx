"use client";
import { ReactNode, FormEvent, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      if (res.ok && (await jsonData.statusCode) < 400) {
        const resData = await jsonData?.data;
        // console.log(jsonData, resData);
        toast.dismiss();
        toast.success(await jsonData.message);

        if (apiUrl.split("/")[2] === "update") {
          router.push(`/user/profile/${apiUrl.split("/")[3]}`);
        }
        if (apiUrl === "/api/users/login") {
          router.push(`/user/profile/${resData.id}`);
        }
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
    <section className="flex flex-col items-center justify-center bg-base-200 p-2 sm:p-5 md:p-10">
      <h2 className="text-3xl font-bold">{headingName}</h2>
      <form
        ref={ref}
        className="flex flex-col items-center justify-center  rounded-lg px-5 py-10 md:m-5 w-[80vw] gap-5 bg-base-100"
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
