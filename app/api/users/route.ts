import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany();
  if (!data)
    return NextResponse.json(new ApiError(404, "There have no user"), {
      status: 404,
    });

  return NextResponse.json(new ApiResponse(200, data, "success"), {
    status: 200,
  });
}
