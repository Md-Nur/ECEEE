import AddEvent from "@/components/admin/AddEvent";
import UpdateCarousel from "@/components/admin/UpdateCarousel";
import Link from "next/link";

const Admin = () => {
  return (
    <main className="mx-auto my-12">
      <div className="flex w-full pb-14">
        <Link
          href="/admin/unverified-members"
          className="btn btn-success mx-auto"
        >
          Unverified Memebers
        </Link>
      </div>
      <AddEvent />
      <UpdateCarousel />
    </main>
  );
};

export default Admin;
