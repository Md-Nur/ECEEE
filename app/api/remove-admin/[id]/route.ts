import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import ApiResponse from "../../utils/ApiResponse";
import ApiError from "../../utils/ApiError";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        isAdmin: false,
      },
    });
    return NextResponse.json(
      new ApiResponse(200, "", "This user is remove from admin"),
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      new ApiError(420, e.message || "Can't remove this user from a admin"),
      { status: 402 }
    );
  }
}