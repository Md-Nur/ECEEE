"use client";

import { useState, useEffect } from "react";

export interface User {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  image: string;
}

const Profile = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<User | any>();
  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [params.id]);
  if (!user?.phone) return <p>{user?.errors}</p>;
  console.log(user)
  return (
    <div>
      <p>page:{params.id}</p>
      <p>Full Name: {user.fullname}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
      <p>Phone: {user?.phone}</p>
      <p>image: {user?.image}</p>
    </div>
  );
};

export default Profile;
