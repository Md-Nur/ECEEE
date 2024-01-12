"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Carousel {
  id: string;
  title: string;
  slogan: string;
  image: string;
}

const UpdateCarousel = () => {
  const router = useRouter();
  const [carousel, setCarousel] = useState<Carousel[]>([]);
  const handleDelete = async (id: string) => {
    toast.loading("Deleting...");
    const res = await fetch(`/api/carousel/${id}`, { method: "DELETE" });
    const jData = await res.json();
    toast.dismiss();
    if (jData.statusCode < 400) {
      router.push("/");
      toast.success(jData.message);
    } else toast.error(jData.errors);
  };
  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.json())
      .then((jdata) => {
        toast.dismiss();
        if (jdata?.statusCode < 400) setCarousel(jdata.data);
        else toast.error(jdata.errors);
      });
  }, []);

  return (
    <section className="w-full flex flex-col bg-base-300 rounded-lg p-3">
      <h2 className="text-4xl text-center font-bold">Carousel / Banner</h2>
      <Link href="/admin/carousel" className="btn btn-primary mx-auto my-5">
        Add Carousel Image
      </Link>
      <div className="flex flex-wrap justify-around">
        {carousel.map((item, index) => (
          <div
            key={index}
            className="card card-compact w-80 bg-base-100 shadow-xl m-3"
          >
            <figure>
              <Image
                className="w-full"
                src={item.image}
                alt={item.title}
                width={250}
                height={250}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.slogan}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="btn btn-error"
                >
                  Delete
                </button>
                <Link
                  href={`/admin/carousel/${item.id}`}
                  className="btn btn-info"
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpdateCarousel;
