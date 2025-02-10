import { singleton } from "@/lib/lifecycle";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    return NextResponse.json((singleton('plugin', () => null) as any).getPluginList());
}
