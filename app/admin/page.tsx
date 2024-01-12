import AddEvent from "@/components/admin/AddEvent";
import UpdateCarousel from "@/components/admin/UpdateCarousel";

const Admin = () => {
  return (
    <main className="mx-auto max-w-[95vw] lg:max-w-[80vw] my-12">
      <UpdateCarousel />
      <AddEvent />
    </main>
  );
};

export default Admin;
