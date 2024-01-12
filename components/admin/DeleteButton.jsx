"use client";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const DeleteButton = ({ apiUrl }) => {
  const router = useRouter();
  const path = usePathname();

  const handleDelete = async () => {
    toast.loading("Deleting...");
    const res = await fetch(apiUrl, { method: "DELETE" });
    const jData = await res.json();
    toast.dismiss();
    if (jData.statusCode < 400) {
      if (path !== "/") router.push("/");
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
        <div className="modal-box">
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
