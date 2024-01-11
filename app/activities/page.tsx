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
      auther: string;
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
      <div className="text-center text-error text-5xl py-52">{error?.errors}</div>
    );
  return (
    <section className="w-screen">
      <h1 className="text-3xl font-bold text-center my-9">Activites</h1>
      <div className="mx-auto w-[90vw] max-w-screen-md">
        {events.length < 1
          ? [1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4 h-[500px]  shadow">
                <div className="skeleton h-72 w-full"></div>
                <div className="skeleton h-4 w-44 ml-5"></div>
                <div className="skeleton h-4 w-44 ml-5"></div>
                <div className="skeleton h-10 w-44 ml-7 md:ml-48"></div>
              </div>
            ))
          : events.map((event) => (
              <div
                className="card w-[95vw] max-w-md h-[500px] m-1 md:m-5 bg-base-100 shadow-xl"
                key={event.id}
              >
                <figure>
                  <Link
                    href={`/activities/${event.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <Image
                      src={event.images[0]}
                      alt={event.images[0]}
                      width={500}
                      height={500}
                    />
                  </Link>
                </figure>
                <div className="card-body">
                  <Link
                    href={`/activities/${event.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    <h2 className="card-title">{event.title}</h2>
                  </Link>
                  <p className="text-xs">
                    {event.auther} | {event.createdAt}
                  </p>
                  <p>{event.description.slice(0, 10)}..</p>
                  <Link
                    href={`/admin/update-event/${event.id}`}
                    className="btn btn-info"
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default Events;
