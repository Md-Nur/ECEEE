import prisma from "@/prisma/client";
import bcryptjs from "bcryptjs";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { NextRequest, NextResponse } from "next/server";
import { fileToUrl } from "../../utils/files.js";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.formData();
    const files: any = reqBody.getAll("images");

    const images = String(await fileToUrl(files));
    const data = {
      fullname: String(reqBody.get("fullname") || ""),
      email: String(reqBody.get("email") || ""),
      phone: String(reqBody.get("phone")),
      password: String(reqBody.get("password")),
    };

    if (!data.phone || !data.password)
      return NextResponse.json(
        new ApiError(404, "Phone number and password is required"),
        { status: 404 }
      );

    const user = await prisma.user.findFirst({
      where: {
        phone: data?.phone,
      },
    });
    if (user) {
      return NextResponse.json(
        new ApiError(400, "User already exist with this phone number"),
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        images: images,
        phone: data.phone,
        password: hashedPassword,
      },
    });

    if (!newUser)
      return NextResponse.json(new ApiError(400, "User did not created!"), {
        status: 400,
      });

    return NextResponse.json(
      new ApiResponse(201, newUser, "User created successfully"),
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(new ApiError(500, e.message), { status: 500 });
  }
}
