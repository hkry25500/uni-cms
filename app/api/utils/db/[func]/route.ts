import { getUserById, getUsers, getUsersTableColumns } from "@/lib/util/db";
import { NextRequest, NextResponse } from "next/server";

const funcs: { [key: string]: Function } = {
    getUsers,
    getUserById,
    getUsersTableColumns,
}

export async function GET(req: NextRequest, { params }: {
    params: Promise<{ func: string }>
})
{
    const { func } = await params;

    const f = funcs[func];
    if (!f) {
        return NextResponse.json(
            { success: false, error: 'Invalid function' },
            { status: 500 }
        );
    }

    // 约定: args_0, args_1, args_2... 形式传递参数
    const args: string[] = [];
    let i = 0;
    let arg = req.nextUrl.searchParams.get(`args_${i}`);
    while (arg !== null) {
        args.push(arg);
        i++;
        arg = req.nextUrl.searchParams.get(`args_${i}`);
    }

    try {
        const result = await f(...args);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}