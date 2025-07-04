import { NextRequest, NextResponse } from "next/server";
import { fileToUrl } from "../utils/files";
import ApiError from "../utils/ApiError.js";
import { z } from "zod";
import prisma from "@/prisma/client";
import ApiResponse from "../utils/ApiResponse";

export const carouselSchema = z.object({
  title: z.string(),
  slogan: z.string(),
  image: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: any = data.get("images");

  const image = await fileToUrl(file, "carousel");

  if (!image || image.length < 1) {
    return NextResponse.json(new ApiError(400, "Images are required"), {
      status: 400,
    });
  }
  const body = {
    title: data.get("title"),
    slogan: data.get("slogan"),
    image: image,
  };

  const validatedData = carouselSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(new ApiError(400, "Invalid data types"), {
      status: 400,
    });
  }
  const event = await prisma.carousel.create({ data: validatedData.data });

  if (!event) {
    return NextResponse.json(
      new ApiError(
        500,
        "There have some porblem to add this image in database"
      ),
      { status: 500 }
    );
  }

  // return NextResponse.json(product, { status: 201 });
  return NextResponse.json(
    new ApiResponse(201, "", "Carousel image added successfully"),
    {
      status: 201,
    }
  );
}

export async function GET(req: NextRequest) {
  let carousel;
  try {
    carousel = await prisma.carousel.findMany();
  } catch (error: any) {
    return NextResponse.json(new ApiError(450, error.errors), { status: 450 });
  }
  if (!carousel || carousel.length < 1)
    return NextResponse.json(new ApiError(404, "There have no image"), {
      status: 404,
    });
  return NextResponse.json(new ApiResponse(200, carousel), { status: 200 });
}
