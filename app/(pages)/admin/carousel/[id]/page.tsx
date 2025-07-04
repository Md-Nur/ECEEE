"use client";
import Forms from "@/components/Form";
import { useEffect, useState } from "react";

interface Carousel {
  id: string;
  title: string;
  slogan: string;
  image: string;
}

const UpdateCarousel = ({ params }: { params: { id: string } }) => {
  const Props: any = {
    headingName: "Update Carousel",
    method: "PUT",
    apiUrl: `/api/carousel/${params.id}`,
    submitName: "Update Carousel",
  };
  const [carousel, setCarousel] = useState<Carousel | null>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    fetch(`/api/carousel/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode < 400) setCarousel(data.data);
        else setError(data);
      });
  }, [params.id]);

  if (error)
    return (
      <section className="h-[500] flex items-center justify-center">
        <h1 className="text-error py-52 text-6xl">{error.errors}</h1>
      </section>
    );
  else if (!carousel)
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
        value={carousel.title}
        onChange={(e) => setCarousel({ ...carousel, title: e.target.value })}
      />
      <input
        type="text"
        className="input input-bordered w-full"
        name="slogan"
        placeholder="Slogan"
        value={carousel.slogan}
        onChange={(e) => setCarousel({ ...carousel, slogan: e.target.value })}
      />

      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden md:inline text-xs">
          Images: (If you don&apos;t want to update image remain this field
          blank){" "}
        </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10 file-input-success"
          accept="image/png, image/jpeg"
          id="img"
          // multiple
        />
      </label>
    </Forms>
  );
};

export default UpdateCarousel;
