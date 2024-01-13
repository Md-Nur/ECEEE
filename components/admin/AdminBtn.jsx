"use client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/context/userContext";

const AdminBtn = ({ apiUrl }) => {
  const { userAuth, setUserAuth } = useUserAuth();
  const router = useRouter();
  const isAdmin = apiUrl.split("/")[2] === "remove-admin";

  const changeAdmin = async () => {
    toast.loading(isAdmin ? "Removing Admin..." : "Making Admin...");
    if (Number(apiUrl.split("/")[3]) === userAuth.id) {
      toast.dismiss()
      toast.error("Admin can't remove himself from admin");
      router.push(`/user/profile/${userAuth.id || ""}`);
      return;
    }
    const res = await fetch(apiUrl, {
      method: "PUT",
    });
    const jData = await res.json();
    toast.dismiss();
    if (jData.statusCode < 400) {
      if (isAdmin) router.push("/members");
      else router.push("/executive-committee");
      toast.success(jData.message);
    } else toast.error(jData.errors);
  };
  return (
    <section>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-warning"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        {isAdmin ? "Remove Admin" : "Make Admin"}
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p>{isAdmin ? "Remove this user admin" : "Make this user admin"}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={changeAdmin} className="btn btn-warning">
                {isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
              <button className="btn mx-5 rounded">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default AdminBtn;
