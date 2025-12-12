import { db } from "@/db/client";
import { account } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await db.select().from(account).limit(5);
  return NextResponse.json(users);
}
