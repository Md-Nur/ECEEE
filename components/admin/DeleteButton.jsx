"use client";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userContext";

const DeleteButton = ({ apiUrl }) => {
  const router = useRouter();
  const path = usePathname();
  const { userAuth } = useUserAuth();

  const handleDelete = async () => {
    toast.loading("Deleting...");
    if (Number(apiUrl.split("/")[3]) === userAuth.id) {
      toast.dismiss();
      toast.error("User can't remove himself from user");
      router.push(`/user/profile/${userAuth.id || ""}`);
      return;
    }
    const res = await fetch(apiUrl, { method: "DELETE" });
    const jData = await res.json();
    toast.dismiss();
    if (jData.success) {
      if (path !== "/" && path !== "/admin") router.push("/");
      toast.success(jData.message);
    } else toast.error(jData.errors);
  };
  return (
    <section>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-error"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Delete!!
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box text-white">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p>You won&apos;t be able to revert this!</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleDelete}
                className="btn btn-error mx-5 rounded"
              >
                Delete
              </button>
              <button className="btn mx-5 rounded">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default DeleteButton;
