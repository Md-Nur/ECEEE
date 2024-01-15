import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  fullname: z.string(),
  rollNo: z.number(),
  session: z.string(),
  year: z.number(),
  phone: z.string(),
  email: z.string(),
  interests: z.string(),
  password: z.string(),
  images: z.string(),
});

export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany();
  if (!data || data.length < 1)
    return NextResponse.json(new ApiError(404, "There have no user"), {
      status: 404,
    });

  return NextResponse.json(new ApiResponse(200, data), {
    status: 200,
  });
}
