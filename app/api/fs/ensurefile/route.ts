import { NextRequest, NextResponse } from "next/server";
import fs from 'fs-extra';


export async function GET(req: NextRequest)
{
    const path = req.nextUrl.searchParams.get('path') as string;

    await fs.ensureFile(path)
        .then(() => {
            return NextResponse.json({ success: true });
        })
        .catch((err) => {
            return NextResponse.json({ success: false, error: err }, { status: 500 });
        })

    return NextResponse.json({ success: false, error: undefined }, { status: 500 });
}
