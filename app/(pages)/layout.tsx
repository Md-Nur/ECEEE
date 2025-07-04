import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

const Pages = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-5 p-5">
      <aside className="hidden sm:flex justify-center items-center">
        <Sidebar />
      </aside>
      <section className="col-span-4">{children}</section>
    </div>
  );
};

export default Pages;
