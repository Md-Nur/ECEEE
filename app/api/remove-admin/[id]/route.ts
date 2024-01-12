import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";
import jwt from "jsonwebtoken";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let user;
  try {
    user = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        isAdmin: false,
      },
    });

    //create token data
    const tokenData = {
      id: user.id,
      images: user.images,
      isAdmim: user.isAdmin,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {
      expiresIn: "125d",
    });

    const res = NextResponse.json(
      new ApiResponse(200, user, "This user is remove from admin"),
      {
        status: 200,
      }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(420, e.message || "Can't remove this user from a admin"),
      { status: 402 }
    );
  }
}
