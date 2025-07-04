"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "@/app/context/userContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DeleteButton from "@/components/admin/DeleteButton";

export interface Event {
  id: number;
  title: string;
  author: string;
  description: string;
  images: string[];
  createdAt: string;
}
const Event = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError]: [any | Error, any] = useState();

  const { userAuth } = useUserAuth();

  useEffect(() => {
    fetch(`/api/events/${params.id}`)
      .then((res) => res.json())
      .then((jdata) => {
        if (jdata.statusCode >= 400) {
          setError(jdata);
        } else {
          return jdata.data;
        }
      })
      .then((data) => setEvent(data));
    // .catch((err) => setError(err));
  }, [params.id]);
  if (error)
    return (
      <div className="text-center text-error text-5xl py-52">
        {error?.errors}
      </div>
    );
  if (!event)
    return (
      <div className="flex items-center justify-center w-[95vw] max-w-screen-xl py-1 gap-10 flex-col mx-auto">
        <div className="skeleton h-12 my-10 w-96 "></div>
        <div className="skeleton h-[400px] w-[90%]"></div>
        <div className="skeleton h-[400px] w-[90%]"></div>
      </div>
    );
  return (
    <section className="">
      <h1 className="text-3xl font-bold text-center my-9">{event?.title}</h1>
      <div className="mx-auto w-[95vw] max-w-screen-xl py-1 my-5">
        <div className="w-[90%] mx-auto my-10 rounded-lg bg-neutral shadow-xl pb-1">
          <figure className="p-3 relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              pagination={{ clickable: true }}
              navigation
              spaceBetween={50}
              slidesPerView={1}
              autoplay
              loop={true}
            >
              {event?.images.map((item: string, index: number) => (
                <SwiperSlide key={index} className="my-auto">
                  <Image
                    src={item}
                    alt={item || "Can't find image"}
                    height={600}
                    width={1900}
                    className="object-cover rounded-lg max-h-[600px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </figure>
          <div className="p-5">
            <p className="text-xs my-3">
              {event.author || "Unknown"} | {event.createdAt.slice(0, 10)}
            </p>
            {userAuth.isAdmin && (
              <div className="flex gap-1">
                <Link
                  href={`/admin/event/${params.id || event.id}`}
                  className="btn btn-info mx-2"
                >
                  Update
                </Link>
                <DeleteButton apiUrl={`/api/events/${params.id || event.id}`} />
              </div>
            )}
            <p className="my-3">{event.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
