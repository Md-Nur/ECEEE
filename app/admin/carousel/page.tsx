import Forms from "@/components/Form";
import React from "react";

const AddCarousel = () => {
  return (
    <Forms
      {...{
        headingName: "Add Carousel Image",
        method: "POST",
        apiUrl: `/api/carousel`,
        submitName: "Add",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        className="input input-bordered w-full"
      />

      <input
        type="text"
        placeholder="Slogan"
        name="slogan"
        className="input input-bordered w-full"
      />
      <label
        htmlFor="img"
        className="flex items-center justify-between w-full px-1 md:px-4 py-1 border rounded"
      >
        <span className="hidden sm:inline text-xs md:text-lg">Image: </span>
        <input
          type="file"
          name="images"
          className="file-input w-full mx-5 rounded max-h-10"
          accept="image/png, image/jpeg"
          required
          id="img"
          // multiple
        />
      </label>
    </Forms>
  );
};

export default AddCarousel;
