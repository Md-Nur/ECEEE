import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import { deleteFiles, fileToUrl } from "../../utils/files";
import { userSchema } from "../route";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

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

  return NextResponse.json(new ApiResponse(200, user), { status: 200 });
}

export async function PUT(req: NextRequest, { params }: Props) {
  const data = await req.formData();
  const file: any = data.get("images");

  const prevData = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  let image: string = prevData?.images!;

  if (file.size > 1) {
    try {
      await deleteFiles(image, "users"); // deleting the previous files
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
      image = await fileToUrl(file, "users");
    } catch (e: any) {
      return NextResponse.json(
        new ApiError(420, e.message || "There have a problem to upload avatar"),
        { status: 420 }
      );
    }
  }
  const body = {
    fullname: data.get("fullname"),
    phone: data.get("phone"),
    images: image,
    email: data.get("email") || "",
    password: data.get("password") || "",
    stockQuantity: Number(data.get("stockQuantity")),
  };

  const validatedData = userSchema.safeParse(body);
  if (!validatedData.success) {
    return NextResponse.json(validatedData.error.errors, { status: 400 });
  }
  const salt = await bcryptjs.genSalt(10);
  validatedData.data.password = await bcryptjs.hash(
    validatedData.data.password,
    salt
  );
let updatedUser
  try {
    updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: validatedData.data,
    });
  } catch {
    throw new ApiError(404, "User data did not update");
  }

    //create token data
    const tokenData = {
      id: updatedUser.id,
      images: updatedUser.images,
      isAdmim: updatedUser.isAdmin,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {
      expiresIn: "125d",
    });

    const res = NextResponse.json(
      new ApiResponse(202, "", "User details updated Successfully"),
      {
        status: 202,
      }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;

  
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const prevData = await prisma.user.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  let image: string = prevData?.images!;
  try {
    await deleteFiles(image, "user");
  } catch (error: any) {
    return NextResponse.json(
      new ApiError(420, error.message || "Can't delete images")
    );
  } // deleting the previous files

  const product = await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  if (!product || !prevData) {
    return NextResponse.json(new ApiError(400, "User can't be deleted"), {
      status: 400,
    });
  }

  return NextResponse.json(
    new ApiResponse(202, "", "User deleted successfully"),
    { status: 202 }
  );
}
