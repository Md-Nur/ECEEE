import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { deleteFiles, fileToUrl } from "../../utils/files";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse";
import { carouselSchema } from "../route";

interface Props {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: Props) {
  const data = await req.formData();
  const files: any = data.get("images");

  const prevData = await prisma.carousel.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  let image: string = prevData?.image!;

  if (files.size > 1) {
    try {
      await deleteFiles(image); // deleting the previous files
    } catch (e: any) {
      return NextResponse.json(
        new ApiError(420, e.message || "Previous Images can not be deleted"),
        { status: 420 }
      );
    }
    try {
      image = await fileToUrl(files, "carousel");
    } catch (e: any) {
      return NextResponse.json(
        new ApiError(420, e.message || "There have a problem to upload image"),
        { status: 420 }
      );
    }
  }
  const body = {
    title: data.get("title") || "",
    slogan: data.get("slogan") || "",
    image: image,
  };
  // console.log(body);

  const validatedData = carouselSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(new ApiError(400, "Invalied Data type"), {
      status: 400,
    });
  }

  try {
    await prisma.carousel.update({
      where: { id: Number(params.id) },
      data: validatedData.data,
    });
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(404, e.message || "Carousel data did not update"),
      { status: 404 }
    );
  }

  return NextResponse.json(
    new ApiResponse(202, "", "Carousel image updated successfully")
  );
}

export async function GET(req: NextRequest, { params }: Props) {
  const carousel = await prisma.carousel.findUnique({
    where: { id: Number(params.id) },
  });
  if (!carousel || carousel === null)
    return NextResponse.json(new ApiError(404, "Image not found"), {
      status: 404,
    });

  return NextResponse.json(new ApiResponse(200, carousel), { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const prevData = await prisma.carousel.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  let image: string = prevData?.image!;

  await deleteFiles(image); // deleting the previous files

  const carousel = await prisma.carousel.delete({
    where: { id: Number(params.id) },
  });

  if (!carousel || !prevData) {
    return NextResponse.json(
      new ApiError(400, "Your image can not be deleted"),
      { status: 400 }
    );
  }

  return NextResponse.json(
    new ApiResponse(202, "", "Image deleted successfully"),
    { status: 202 }
  );
}
