import fs from 'fs-extra';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest)
{
    const path = req.nextUrl.searchParams.get('path');

    if (!path) {
        return NextResponse.json({ error: 'Directory name is required' });
    }

    try {
        await fs.mkdirp(path);
        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create directory' }, { status: 500 });
    }
}