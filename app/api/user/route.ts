import { NextRequest } from "next/server";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../../../schema";
import { LinksTable, User, UserTable } from "../../../schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema: schema });

/**
 * Gets user and associated urls
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  console.log("qweqweq", searchParams);
  const name = searchParams.get("name");
  const wallet = searchParams.get("wallet");
  if (!name && !wallet) {
    return Response.json(
      { error: "No wallet or name provided" },
      { status: 400 },
    );
  }

  if (name) {
    const res = await db.query.UserTable.findFirst({
      where: eq(UserTable.name, name),
      with: {
        links: true,
      },
    });

    return Response.json({ res });
  }

  if (wallet) {
    const res = await db.query.UserTable.findFirst({
      where: eq(UserTable.wallet, wallet),
      with: {
        links: true,
      },
    });

    return Response.json({ res });
  }
}

/**
 * Create new user
 * @param request
 * @constructor
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as Omit<User, "id">;
  const { name, wallet, image, links } = body;

  // check if user exists
  let existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.wallet, wallet),
  });

  if (!existingUser?.name) {
    const res = await db
      .insert(UserTable)
      .values({
        name,
        image,
        wallet,
        id: crypto.randomUUID(),
      })
      .returning()
      .execute();
    existingUser = res[0];
  }

  // add links

  if (!existingUser?.id) throw Error("No user");

  const promisers = links?.map(async (x) => {
    return db.insert(LinksTable).values({
      ...x,
      id: crypto.randomUUID(),
      user: existingUser?.id,
    });
  });

  // @ts-ignore
  await Promise.all(promisers);

  return Response.json({ msg: "OK" });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("id");

  if (!query) throw new Error("No id provided");
  return await db.delete(LinksTable).where(eq(LinksTable.id, query)).execute();
}
