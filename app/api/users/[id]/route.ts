import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiError from "../../utils/ApiError";
// import ApiResponse from "../../utils/ApiResponse";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  if (!user || user === null) 
  return NextResponse.json(new ApiError(404, "User not found"),{status:404})

  return NextResponse.json(user, { status: 200 });
}
