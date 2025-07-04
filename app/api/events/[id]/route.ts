import { NextRequest, NextResponse } from "next/server";
import { eventSchema } from "../route";
import prisma from "@/prisma/client";
import { deleteFiles, filesToUrls } from "../../utils/files";
import ApiError from "@/app/api/utils/ApiError.js";
import ApiResponse from "@/app/api/utils/ApiResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const event = await prisma.event.findUnique({
    where: { id: Number(params.id) },
  });

  if (!event) {
    return NextResponse.json({ message: "No product is found with this Id!!" });
  }

  return NextResponse.json(new ApiResponse(200, event));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.formData();
  const files: any = data.getAll("images");

  const prevData = await prisma.event.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  let images: string[] = prevData?.images!;

  if (files[0].size > 1) {
    try {
      await deleteFiles(images); // deleting the previous files
    } catch (e: any) {
      return NextResponse.json(
        new ApiError(
          420,
          e.message || "There have a problem to delete previous images"
        ),
        { status: 420 }
      );
    }
    try {
      images = await filesToUrls(files, "events");
    } catch {
      return NextResponse.json(
        new ApiError(404, "There have a problem to upload on cloudinary"),
        { status: 404 }
      );
    }
  }
  const body = {
    title: data.get("title"),
    description: data.get("description"),
    images: images,
    author: data.get("author") || "",
  };

  const validatedData = eventSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(validatedData.error.errors, { status: 400 });
  }

  let updatedEvent;
  try {
    updatedEvent = await prisma.event.update({
      where: { id: Number(params.id) },
      data: validatedData.data,
    });
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(404, e.message || "Event not found"),
      { status: 404 }
    );
  }

  return NextResponse.json(
    new ApiResponse(202, updatedEvent, "Event details update successfully")
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const prevData = await prisma.event.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  let images: string[] = prevData?.images!;
  try {
    await deleteFiles(images);
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(450, e.message || "Can't delete previous images"),
      { status: 450 }
    );
  } // deleting the previous files

  try {
    await prisma.event.delete({
      where: { id: Number(params.id) },
    });
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(500, e.message || "This event can't be deleted"),
      { status: 500 }
    );
  }

  return NextResponse.json(
    new ApiResponse(202, "", "Event deleted successfully")
  );
}
