import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { deleteFiles, fileToUrl } from "../../utils/files";
import { userSchema } from "../route";

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user || user === null)
    return NextResponse.json(new ApiError(404, "User not found"), {
      status: 404,
    });

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: Props) {
  const data = await req.formData();
  const files: any = data.getAll("images");

  const prevData = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  let images: string = prevData?.images!;

  if (files[0] && files[0].size > 1) {
    try {
      await deleteFiles(images, "users"); // deleting the previous files
    } catch {
      return NextResponse.json(
        new ApiError(420, "There have a problem to delete previous images"),
        { status: 420 }
      );
    }
    try {
      images = await fileToUrl(files, "users");
    } catch {
      return NextResponse.json(
        new ApiError(420, "There have a problem to upload avatar"),
        { status: 420 }
      );
    }
  }
  const body = {
    fullname: data.get("fullname"),
    phone: data.get("phone"),
    images: images,
    email: data.get("email") || "",
    password: data.get("password") || "",
    stockQuantity: Number(data.get("stockQuantity")),
  };

  const validatedData = userSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(validatedData.error.errors, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: Number(params.id) },
      data: validatedData.data,
    });
  } catch {
    throw new ApiError(404, "User data did not update");
  }

  return NextResponse.json(
    new ApiResponse(202, "", "User details updated successfully")
  );
}
