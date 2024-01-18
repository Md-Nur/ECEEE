import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";
import prisma from "@/prisma/client";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const typeSchema = z.object({
  type: z.string(),
});

export async function POST(req: NextRequest) {
  const fData = await req.formData();
  const fType = fData.get("member-type");

  const validedData = typeSchema.safeParse({ type: fType });
  if (!validedData.success)
    return NextResponse.json(
      new ApiError(450, validedData.error.errors[0].message),
      { status: 425 }
    );
  try {
    const type = await prisma.memberType.create({
      data: validedData.data,
    });
    return NextResponse.json(
      new ApiResponse(202, type, "Member type added successfully"),
      { status: 202 }
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(424, error.message), { status: 424 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const type = await prisma.memberType.findMany();
    if (type.length < 1) {
      return NextResponse.json(
        new ApiError(404, "There have no member type found"),
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      new ApiResponse(200, type, "Successfully get data")
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(404, error.message), { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    const type = await prisma.memberType.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(
      new ApiResponse(200, type, "Membership type delete successfully")
    );
  } catch (error: any) {
    return NextResponse.json(new ApiError(404, error.message), { status: 404 });
  }
}
