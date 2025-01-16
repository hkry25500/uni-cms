import { NextRequest, NextResponse } from "next/server";
import path from "path";


export async function GET(_req: NextRequest, { params }: {
    params: Promise<any>
})
{
    return NextResponse.json(path.join(...(await params).paths));
}