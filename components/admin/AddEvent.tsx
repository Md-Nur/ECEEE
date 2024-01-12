"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Forms from "../Form";

interface Event {
  id: string;
  title: string;
  description: string;
  images: string;
  author: string;
}

const AddEvent = () => {
  const [event, setEvent] = useState<Event[]>([]);
  const handleAdd = async (id: string) => {
    toast.loading("Adding...");
    const res = await fetch(`/api/event/${id}`, { method: "DELETE" });
    const jData = await res.json();
    toast.dismiss();
    if (jData.statusCode < 400) toast.success(jData.message);
    else toast.error(jData.errors);
  };
  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((jdata) => {
        toast.dismiss();
        if (jdata?.statusCode < 400) setEvent(jdata.data);
        else toast.error(jdata.errors);
      });
  }, [event, handleAdd]);

  return (
    <Forms
      {...{
        headingName: "Add Activities",
        method: "POST",
        apiUrl: "/api/events",
        submitName: "Add",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        name="description"
        className="input input-bordered w-full h-52 p-5"
      />
      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden sm:inline text-xs md:text-lg">Images: </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10"
          accept="image/png, image/jpeg"
          required
          id="img"
          multiple
        />
      </label>
      <input
        type="text"
        name="author"
        placeholder="Author"
        className="input input-bordered w-full"
      />
    </Forms>
  );
};

export default AddEvent;
