import prisma from "@/prisma/client";
import bcryptjs from "bcryptjs";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.formData();
    const data = {
      fullname: String(reqBody.get("fullname")),
      email: String(reqBody.get("email")),
      phone: String(reqBody.get("phone")),
      password: String(reqBody.get("password")),
    };
    console.log(reqBody);
    const user = await prisma.user.findFirst({
      where: {
        phone: data?.phone,
      },
    });
    if (user) {
      throw new ApiError(400, "User already exist with this phone number");
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      new ApiResponse(201, newUser, "User created successfully"),
      { status: 201 }
    );
  } catch (e: any) {
    throw new ApiError(500, e.message);
  }
}
