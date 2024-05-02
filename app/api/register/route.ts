import { NextResponse } from "next/server";
import { APIResponse } from "@/lib/api-types";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    const response: APIResponse = {
      status: "success",
      error: null,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    const response: APIResponse = {
      status: "Something went wrong",
      error,
    };
    return new NextResponse(JSON.stringify(response), { status: 500 });
  }
}
