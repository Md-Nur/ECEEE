import Link from "next/link";
import Image from "next/image";
import { useUserAuth } from "@/app/context/userContext";

export interface User {
  id: number;
  fullname: string;
  rollNo: number;
  session: string;
  year: number;
  phone: string;
  email: string;
  interests: string;
  password: string;
  images: string;
  isVerified: boolean;
  isAdmin: boolean;
  membershipFee: number;
  membershipValidity: string;
  membershipType: string;
  memberId: number;
}

const Member = ({ ...user }: User) => {
  const { userAuth } = useUserAuth();
  return (
    <section key={user.id} className="collapse bg-neutral mx-auto my-3">
      <input type="radio" name="my-accordion-3" />
      <div className="collapse-title text-xl font-medium">
        <div className="collapse-title">
          <div className="flex items-center flex-col md:flex-row">
            <div className="avatar">
              <div className="w-14 mask mask-squircle">
                <Image
                  alt={user?.fullname}
                  fill
                  src={
                    user?.images ||
                    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
            <p className="md:text-xl font-medium mx-5">
              {user.fullname ? user.fullname : user?.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="collapse-content text-xs sm:text-base">
        {user?.rollNo !== 0 && <p className="mx-3">Roll No: {user?.rollNo}</p>}
        <div className="m-2">
          <Link
            href={`/user/profile/${user.id}`}
            className="btn btn-primary mx-1"
          >
            View Profile
          </Link>
          {userAuth?.id === user.id && (
            <Link
              href={`/user/update/${user.id}`}
              className="btn btn-info mx-1"
            >
              Update Profile
            </Link>
          )}
          {userAuth?.isAdmin && (
            <Link
              href={`/admin/update-admin/${user?.id}`}
              className="btn btn-warning"
            >
              Update Admin Info
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Member;
