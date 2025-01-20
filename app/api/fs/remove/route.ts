import { NextRequest, NextResponse } from "next/server";
import fs from 'fs-extra';


export async function GET(req: NextRequest)
{
    const dir = req.nextUrl.searchParams.get('dir')!;

    try {
        await fs.remove(dir);
        return NextResponse.json({ success: true });
    }
    catch (err) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}