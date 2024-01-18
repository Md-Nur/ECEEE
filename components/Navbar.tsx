"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/ru-logo.png";
import LogoutButton from "./LogoutButton";
import { useUserAuth } from "@/app/context/userContext";
// import { useEffect, useState } from "react";

const Navbar = () => {
  const { userAuth } = useUserAuth();
  const NavLinks = () => {
    return (
      <>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/members">Members</Link>
        </li>
        <li>
          <Link href="/executive-committee">Executive Committee</Link>
        </li>
        {userAuth.isAdmin && (
          <li>
            <Link href="/admin/unverified-members">Unverified Members</Link>
          </li>
        )}
        <li>
          <Link href="/activities">Activites</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </>
    );
  };
  return (
    <nav
      className="navbar sticky top-0 z-10 glass"
      style={{
        backgroundImage: `url('/fadebg.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <NavLinks />
          </ul>
        </div>
        <Link href="/" className="text-xl font-bold text-black w-12">
          <Image alt="Profile" src={logo} />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Profile"
                src={
                  userAuth?.images ||
                  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
                height={50}
                width={50}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {userAuth.id !== 0 && (
              <li>
                <Link
                  href={`/user/profile/${userAuth.id}`}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
            )}

            {userAuth.id !== 0 ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/user/login">Login</Link>
                </li>

                <li>
                  <Link href="/user/signin">Register</Link>
                </li>
              </>
            )}
            {userAuth?.isAdmin && (
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
