import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

export async function GET(req: NextRequest) {
  try {
    const data = await prisma.user.findMany({
      where: {
        isVerified: false,
      },
    });
    return NextResponse.json(new ApiResponse(200, data), {
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(new ApiError(404, error.message), { status: 404 });
  }
}