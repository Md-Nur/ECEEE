import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { filesToUrls } from "@/app/api/utils/files";
import ApiError from "@/app/api/utils/ApiError";
import ApiResponse from "@/app/api/utils/ApiResponse";

export const eventSchema: any = z.object({
  title: z.string(),
  description: z.string().min(10),
  images: z.array(z.string()),
  author: z.string(),
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const files: any = data.getAll("images");

  let images: string[];

  try {
    images = await filesToUrls(files, "events");
  } catch (error: any) {
    return NextResponse.json(
      new ApiError(420, error.message || "can't upload the images")
    );
  }

  if (!images || images.length < 1) {
    return NextResponse.json(new ApiError(400, "Images are required"), {
      status: 400,
    });
  }
  const body = {
    title: data.get("title"),
    description: data.get("description"),
    images: images,
    author: data.get("author") || "",
  };

  const validatedData = eventSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(
      new ApiError(400, validatedData.error.errors[0] || "Invalid type"),
      {
        status: 460,
      }
    );
  }
  try {
    await prisma.event.create({ data: validatedData.data });
  } catch (error: any) {
    return NextResponse.json(
      new ApiError(
        420,
        error.message ||
          "There have some porblem to create this event in database"
      ),
      {
        status: 400,
      }
    );
  }

  // return NextResponse.json(product, { status: 201 });
  return NextResponse.json(
    new ApiResponse(201, "", "Event added successfully"),
    {
      status: 201,
    }
  );
}

export async function GET(req: NextRequest) {
  const events = await prisma.event.findMany();
  if (!events || events.length < 1)
    return NextResponse.json(new ApiError(404, "There have no events"), {
      status: 404,
    });
  return NextResponse.json(events, { status: 200 });
}
