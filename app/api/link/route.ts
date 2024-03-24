import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../../../schema";
import { Link, LinksTable, UserTable } from "../../../schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema: schema });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("owner");
  if (!query) {
    return Response.json({ error: "No owner provided" }, { status: 400 });
  }
  const res = await db.query.LinksTable.findMany({
    where: eq(LinksTable.user, query),
  });

  return Response.json({ res });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Omit<Link, "id">;
  const { url, title, user } = body;

  const userDb = await db.query.UserTable.findFirst({
    where: eq(UserTable.wallet, user),
  });

  if (!userDb?.id) {
    throw new Error("User not found");
  }

  const res = await db
    .insert(LinksTable)
    .values({
      title,
      user: userDb.id,
      url: url,
      id: crypto.randomUUID(),
    })
    .execute();

  return Response.json({ res });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id");

  if (!query) throw new Error("No id provided");
  return await db.delete(LinksTable).where(eq(LinksTable.id, query)).execute();
}
