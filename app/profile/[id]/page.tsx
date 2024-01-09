"use client";
import { useState, useEffect } from "react";

const Profile = ({ params }: { params: { id: string } }) => {
  return <div>page:{params.id}</div>;
};

export default Profile;
