"use client";
import Forms from "@/components/Form";
import { useEffect, useState } from "react";
import { Event } from "@/app/activities/[slug]/[id]/page";

const UpdateEvent = ({ params }: { params: { id: string } }) => {
  const Props: any = {
    headingName: "Update Event",
    method: "PUT",
    apiUrl: `/api/events/${params.id}`,
    submitName: "Update Event",
  };
  const [event, setEvent] = useState<Event | null>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode < 400) setEvent(data.data);
        else setError(data);
      });
  }, [params.id]);

  if (error)
    return (
      <section className="h-[500] flex items-center justify-center">
        <h1>{error.errors}</h1>
      </section>
    );
  else if (!event)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className=" loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <Forms {...Props}>
      <input
        type="text"
        placeholder="Title"
        name="title"
        className="input input-bordered w-full"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        name="description"
        className="input input-bordered w-full h-52 p-5"
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden sm:inline text-xs md:text-lg">
          Images: (If you don&apos;t want to update image remain this field
          blank){" "}
        </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10"
          accept="image/png, image/jpeg"
          id="img"
          multiple
        />
      </label>
      <input
        type="text"
        name="author"
        placeholder="Author"
        className="input input-bordered w-full"
        value={event.author}
        onChange={(e) => setEvent({ ...event, author: e.target.value })}
      />
    </Forms>
  );
};

export default UpdateEvent;
