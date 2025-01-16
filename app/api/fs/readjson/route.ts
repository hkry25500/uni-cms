import { NextRequest, NextResponse } from "next/server";
import { readJson } from "fs-extra";


export async function GET(req: NextRequest)
{
    const filePath = req.nextUrl.searchParams.get("filepath")!;

    try {
        const jsonData = await readJson(filePath);
        return NextResponse.json(jsonData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}