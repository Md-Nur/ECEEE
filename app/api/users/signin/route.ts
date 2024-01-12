import prisma from "@/prisma/client";
import bcryptjs from "bcryptjs";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { NextRequest, NextResponse } from "next/server";
import { fileToUrl } from "../../utils/files.js";
import { userSchema } from "../route";
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.formData();
    const file: any = reqBody.get("images");

    let images: string = "";
    if (file.size > 1)
      try {
        images = await fileToUrl(file, "users");
      } catch (error: any) {
        return NextResponse.json(
          new ApiError(420, error.message || "Upload avatar failed")
        );
      }
    const data = {
      fullname: reqBody.get("fullname"),
      email: reqBody.get("email"),
      phone: reqBody.get("phone"),
      images: images,
      password: reqBody.get("password"),
    };

    if (!data.phone || !data.password)
      return NextResponse.json(
        new ApiError(404, "Phone number and password is required"),
        { status: 404 }
      );
    const validatedData = userSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(validatedData.error.errors, { status: 400 });
    }
    const user = await prisma.user.findFirst({
      where: {
        phone: validatedData.data?.phone,
      },
    });
    if (user) {
      return NextResponse.json(
        new ApiError(400, "User already exist with this phone number"),
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    validatedData.data.password = await bcryptjs.hash(
      validatedData.data.password,
      salt
    );

    const newUser = await prisma.user.create({
      data: validatedData.data,
    });

    if (!newUser)
      return NextResponse.json(new ApiError(400, "User did not created!"), {
        status: 400,
      });

    return NextResponse.json(
      new ApiResponse(
        201,
        {
          fullname: newUser.fullname,
          phone: newUser.phone,
          email: newUser.email,
          images: newUser.images,
        },
        "User created successfully"
      ),
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(new ApiError(500, e.message), { status: 500 });
  }
}
