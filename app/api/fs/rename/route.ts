import { NextRequest, NextResponse } from "next/server";
import fs from 'fs-extra';


export async function GET(req: NextRequest)
{
    const { searchParams } = new URL(req.url);
    const oldPath = searchParams.get('oldPath');
    const newPath = searchParams.get('newPath');

    if (!oldPath || !newPath) {
        return new Response('Missing oldPath or newPath', { status: 400 });
    }

    try {
        await fs.rename(oldPath, newPath);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}