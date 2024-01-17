"use client";
import Link from "next/link";
import { useUserAuth } from "@/app/context/userContext";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const { userAuth } = useUserAuth();
  return (
    <ul className="flex lg:flex-col gap-3 flex-wrap">
      <li>
        <Link className="link link-hover" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="link link-hover" href="/members">
          Members
        </Link>
      </li>
      <li>
        <Link className="link link-hover" href="/executive-committee">
          Executive Committee
        </Link>
      </li>
      {userAuth.isAdmin && (
        <li>
          <Link className="link link-hover" href="/admin/unverified-members">
            Unverified Members
          </Link>
        </li>
      )}
      <li>
        <Link className="link link-hover" href="/activities">
          Activites
        </Link>
      </li>
      <li>
        <Link className="link link-hover" href="/about">
          About
        </Link>
      </li>
      {userAuth.id !== 0 && (
        <li>
          <Link
            href={`/user/profile/${userAuth.id}`}
            className="link link-hover"
          >
            Profile
          </Link>
        </li>
      )}

      {userAuth.id !== 0 ? (
        <>
          <li className="link link-hover underline">
            <LogoutButton />
          </li>
          <li>
            <Link
              href={`/user/update/${userAuth.id}`}
              className="link link-hover"
            >
              Update Your Info
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link className="link link-hover" href="/user/login">
              Login
            </Link>
          </li>

          <li>
            <Link className="link link-hover" href="/user/signin">
              Register
            </Link>
          </li>
        </>
      )}
      {userAuth?.isAdmin && (
        <li>
          <Link className="link link-hover" href="/admin">
            Admin
          </Link>
        </li>
      )}

      {userAuth?.isAdmin && (
        <li>
          <Link
            href={`/admin/update-admin/${userAuth?.id}`}
            className="link link-hover"
          >
            Update Your Admin Info
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Sidebar;
