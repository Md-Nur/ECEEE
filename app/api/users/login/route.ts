import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiError from "../../utils/ApiError";
import jwt from "jsonwebtoken";
import ApiResponse from "../../utils/ApiResponse";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const phone: string = String(data.get("phone"));
    const password = String(data.get("password"));

    // Check if the use existence
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    });
    if (!user)
      return NextResponse.json(
        new ApiError(400, "There have no user with this number"),
        {
          status: 400,
        }
      );

    // password checking
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json(
        new ApiError(401, "Password did not matched with this phone number"),
        { status: 401 }
      );

    //create token data
    const tokenData = {
      id: user.id,
      phone: user.phone,
      isAdmim: user.isAdmin,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {
      expiresIn: "125d",
    });

    const res = NextResponse.json(
      new ApiResponse(200, "", "Login Successfully"),
      {
        status: 200,
      }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json(new ApiError(500, error.message, error), {
      status: 500,
    });
  }
}
