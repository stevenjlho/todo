import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const pageStr = request.nextUrl.searchParams.get("page");
    const limitStr = request.nextUrl.searchParams.get("limit");
    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    const skip = (page - 1) * limit;

    const todos = await prisma.todo.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    let response = {
      status: "success",
      results: todos.length,
      data: {
        todos,
      },
    };
    return NextResponse.json(response);
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    const todo = await prisma.todo.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: {
        todo,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
