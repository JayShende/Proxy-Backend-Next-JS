import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import { auth } from "@/auth";

// Utility to sign internal JWT
function signInternalJwt(userId: string) {
  if (!process.env.INTERNAL_JWT_SECRET) {
    throw new Error("INTERNAL_JWT_SECRET is not set in env");
  }
  return jwt.sign({ userId }, process.env.INTERNAL_JWT_SECRET, {
    expiresIn: "5m",
  });
}

async function proxyRequest(req: NextRequest, path: string[]) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      message: "Session Error",
    });
  }

  const userId = session?.user?.id;
  // 2. Construct backend URL
  const backendUrl = `${process.env.EXPRESS_URL}/${path.join("/")}`;

  // 3. Prepare headers
  const headers: Record<string, string> = {
    Authorization: `Bearer ${signInternalJwt(session.user.id)}`,
    "Content-Type": req.headers.get("content-type") || "application/json",
  };

  try {
    // 4. Forward request to Express
    const response = await axios({
      url: backendUrl,
      method: req.method ,
      headers,
      data: ["POST", "PUT", "PATCH"].includes(req.method)
        ? await req.json()
        : undefined,
    });

    // 5. Return response back to client
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Internal Proxy Error" };
    return NextResponse.json(data, { status });
  }
}

// GET
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}

// POST
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}

// PUT
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}

// DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(req, path);
}
