"use client";
import Forms from "../Form";

const AddEvent = () => {
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
          className="file-input w-full mx-5 rounded max-h-10 file-input-success"
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
