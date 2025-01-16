import { NextRequest } from "next/server";
import path from "path";
import { NextResponse } from "next/server";


export async function GET(req: NextRequest)
{
    const from = req.nextUrl.searchParams.get('from')!;
    const to = req.nextUrl.searchParams.get('to')!;

    const result = path.relative(from, to);

    return NextResponse.json(result);
}