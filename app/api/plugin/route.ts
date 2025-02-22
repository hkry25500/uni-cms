import { NextRequest, NextResponse } from "next/server";
import { PluginManager } from "@/lib/plugin";
import services from "@/lib/ioc/provider";


export async function GET(req: NextRequest) {
    return NextResponse.json(services.get<PluginManager>("PluginManager")!.getPluginList());
}
