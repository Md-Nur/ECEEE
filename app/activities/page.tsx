"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import DeleteProductButton from "./DeleteProductButton";

const Events = () => {
  // interface Props {
  //   id: string;
  // }
  const [events, setEvents]: [
    {
      id: number;
      title: string;
      author: string;
      description: string;
      images: string[];
      createdAt: string;
    }[],
    any
  ] = useState([]);
  const [error, setError]: [any | Error, any] = useState();

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata.statusCode >= 400) {
          setError(jdata);
        } else {
          return jdata;
        }
      })
      .then((data) => data?.reverse())
      .then((data) => setEvents(data));
    // .catch((err) => setError(err));
  }, [error, events]);
  if (error)
    return (
      <div className="text-center text-error text-5xl py-52">
        {error?.errors}
      </div>
    );
  return (
    <section className="">
      <h1 className="text-3xl font-bold text-center my-9">Activites</h1>
      <div className="mx-auto w-[95vw] max-w-screen-lg py-1 my-5">
        {events.length < 1
          ? [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4 shadow">
                <div className="skeleton h-[500px] w-full"></div>
                <div className="skeleton h-4 w-44 ml-5"></div>
                <div className="skeleton h-4 w-44 ml-5"></div>
                <div className="skeleton h-10 w-44 ml-7 md:ml-48"></div>
              </div>
            ))
          : events.map((event) => (
              <div
                className="w-[90%] mx-auto my-10 rounded-lg bg-neutral shadow-xl pb-1"
                key={event.id}
              >
                <figure className="p-3 relative h-[80vw] md:h-[30vw]">
                  <Link
                    href={`/activities/${event.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}/${event.id}`}
                  >
                    <Image
                      src={event.images[0]}
                      alt={event.images[0]}
                      fill
                      className="object-cover overflow-hidden rounded-t-lg"
                    />
                  </Link>
                </figure>
                <div className="p-5">
                  <Link
                    href={`/activities/${event.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}/${event.id}`}
                  >
                    <h2 className="text-3xl font-bold text-center">
                      {event.title}
                    </h2>
                  </Link>
                  <p className="my-3">{event.description.slice(0, 250)}..</p>
                  <p className="text-xs my-3">
                    {event.author || "Unknown"} | {event.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Events;
