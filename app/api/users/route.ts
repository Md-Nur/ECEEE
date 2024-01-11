import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { z } from "zod";

export const userSchema = z.object({
  fullname: z.string(),
  phone: z.string(),
  email: z.string(),
  images: z.string(),
  password: z.string(),
});

export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany();
  if (!data || data.length < 1)
    return NextResponse.json(new ApiError(404, "There have no user"), {
      status: 404,
    });

  return NextResponse.json(data, {
    status: 200,
  });
}
