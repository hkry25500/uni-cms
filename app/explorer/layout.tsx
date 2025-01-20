import { Metadata } from "next"
import ExplorerPage from "./page";


export const metadata: Metadata = {
    title: 'Explorer',
}

export default async function Layout()
{
    return (
        <>
            <ExplorerPage dirpath={process.env.CONTENT_DIR_PATH!} />
        </>
    )
}