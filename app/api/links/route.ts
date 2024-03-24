import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "../../../schema";
import {eq} from "drizzle-orm";
import {LinksTable} from "../../../schema";
import {NextRequest} from "next/server";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, {schema: schema});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('owner')
    if (!query) {
        return Response.json({ error: 'No owner provided' }, { status: 400 })
    }
    const res = await db.query.LinksTable.findMany({
        where: eq(LinksTable.owner, query)
    });

    return Response.json({ res })
}


export async function POST(request: NextRequest) {
    const body = await request.json()
    const { url, title, description, image, owner } = body
    const res = await db.insert(LinksTable).values({
        url,
        title,
        description,
        image,
        owner
    }).execute()

    return Response.json({ res })
}
